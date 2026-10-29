import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { trough } from 'trough';
import { toVFile } from 'to-vfile';
import report from 'vfile-reporter';

import orgToHtml from './org-to-html';
import resolveLinks from './resolve-links';
import { findDownAll } from 'vfile-find-down';
import { VFile } from 'vfile-reporter/lib';

type PageData = {
    slug: string;
    title: string;
    category: string;
    links: string[];
    backlinks: Set<string>;
    filetags?: string;
    // ISO date of the last update, resolved from git (falls back to the
    // filename timestamp, then disk mtime). See `lastUpdated`.
    date?: string;
    // Short excerpt: `#+description:` keyword if set, else the first paragraph.
    description?: string;
};

export type Post = {
    data: PageData;
};

export type Page = VFile & { data: PageData };

// We serve posts from "public" directory, so that we don't have to
// copy assets.
//
// If you change this directory, make sure you copy all assets
// (images, linked files) to the public directory, so that next.js
// serves them.
const pagesDirectory = path.join(process.cwd(), 'public');

const processor = trough().use(collectFiles).use(processPosts).use(resolveLinks);
//.use(populateBacklinks);

function collectFiles(root: string): Promise<Page[]> {
    return new Promise<Page[]>((resolve, reject) => {
        findDownAll('.org', root, (err, files) => {
            if (err) {
                reject(err);
            } else {
                files?.forEach((f) => {
                    if (!f.path) {
                        return;
                    }

                    const relativePath = path.relative(root, f.path).replace(/\.org$/, '');

                    // First element of relative path should be considered a post category
                    const category = relativePath.split('/')[1];
                    const slug = `/${relativePath}`;

                    const data = {
                        slug,
                        title: '',
                        links: [],
                        category,
                        backlinks: new Set(),
                        date: lastUpdated(f.path),
                        description: '',
                    } as PageData;

                    f.data = data;
                });

                resolve((files as unknown as Page[]) || []);
            }
        });
    });
}

async function processPosts(files: Page[]) {
    return Promise.all(files.map(processPost));

    async function processPost(file: Page) {
        try {
            await toVFile.read(file as VFile, 'utf8');
        } catch (e) {
            console.error('Error reading file', file, e);
            throw e;
        }

        file.path = file.data.slug as string;

        await orgToHtml(file);

        // `#+description:` (captured by extractKeywords) wins; otherwise fall
        // back to the first paragraph of the rendered content.
        const description = (file.data.description as string) || extractDescription((file as any).result);
        file.data.description = truncate(description.trim(), 180);

        return file;
    }
}

// Last-updated date as an ISO string. Git commit date is authoritative and
// stable across machines (disk mtime is reset to checkout time on clone/pull).
// Falls back to the org-roam filename timestamp, then disk mtime.
function lastUpdated(filePath?: string): string {
    if (!filePath) return '';

    try {
        const iso = execSync(`git log -1 --format=%cI -- "${path.basename(filePath)}"`, {
            cwd: path.dirname(filePath),
            stdio: ['pipe', 'pipe', 'ignore'],
        })
            .toString()
            .trim();
        if (iso) return iso;
    } catch {
        // git unavailable or file not committed — fall through.
    }

    const match = path.basename(filePath).match(/^(\d{4})(\d{2})(\d{2})\d{6}/);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;

    try {
        return fs.statSync(filePath).mtime.toISOString();
    } catch {
        return '';
    }
}

// Text of the first <p> element in a hast tree.
function extractDescription(tree: any): string {
    let text = '';
    walk(tree);
    return text;

    function walk(node: any) {
        if (text || !node) return;
        if (node.tagName === 'p') {
            text = hastText(node);
            return;
        }
        node.children?.forEach(walk);
    }
}

function hastText(node: any): string {
    if (node.type === 'text') return node.value ?? '';
    return (node.children ?? []).map(hastText).join('');
}

function truncate(text: string, max: number): string {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

// Assign all collected backlinks to file. This function should be
// called after all pages have been processed---otherwise, it might
// miss backlinks.
// function populateBacklinks(files: Page[]) {
//     const backlinks: Record<string, Set<string>> = {};

//     files.forEach((file: Page) => {
//         file.data.links = file.data.links || new Set();
//         file.data.backlinks = backlinks[file.data.slug] = backlinks[file.data.slug] || new Set();

//         file.data.links.forEach((other: string) => {
//             const decodedOther = decodeURIComponent(other);
//             backlinks[decodedOther] = backlinks[decodedOther] || new Set();
//             backlinks[decodedOther].add(file.data.slug);
//         });
//     });
// }

const loadPosts = async () => {
    const files = await new Promise<Page[]>((resolve, reject) =>
        processor.run(pagesDirectory, (err: Error, files: VFile[]) => {
            if (err) {
                console.error(report(err || files, { quiet: true }));
                reject(err);
            } else {
                resolve(files as Page[]);
            }
        })
    );

    const posts = Object.fromEntries(
        Object.values(files)
            .filter((f) => !!f.data)
            .map((f) => {
                return [f.data.slug, f];
            })
    );

    return posts;
};

const allPosts = async () => {
    const posts = await loadPosts();
    return posts;
};

export async function getAllPaths() {
    const posts = await loadPosts();
    return Object.keys(posts);
}

export async function getPostBySlug(slug: string) {
    const posts = await allPosts();
    const post = posts[slug];
    return post;
}

export async function getAllPosts(): Promise<Post[]> {
    const posts = await allPosts();
    return await Promise.all(Object.values(posts));
}

// Posts whose top-level folder under `public/org/` matches `category`.
// e.g. `getPostsInCategory('blog')` returns everything under `public/org/blog/`.
export async function getPostsInCategory(category: string): Promise<Post[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.data.category === category);
}

export function getTags(post: Post): string[] {
    return (post.data.filetags ?? '')
        .split(':')
        .map((t) => t.trim())
        .filter(Boolean);
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getAllPosts();
    const tags = new Set<string>();
    posts.forEach((post) => getTags(post).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
}
