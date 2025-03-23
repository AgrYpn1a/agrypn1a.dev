import * as path from 'path';
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

        return file;
    }
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
