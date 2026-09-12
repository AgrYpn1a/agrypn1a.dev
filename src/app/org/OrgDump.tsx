'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export type DumpPost = {
    slug: string;
    title: string;
    category: string;
    tags: string[];
};

export default function OrgDump({ posts, tags }: { posts: DumpPost[]; tags: string[] }) {
    const [selected, setSelected] = useState<string | null>(null);

    const toggle = (tag: string) => setSelected((current) => (current === tag ? null : tag));

    const visible = selected ? posts.filter((post) => post.tags.includes(selected)) : posts;

    return (
        <div>
            {tags.length > 0 && (
                <div className={styles.tags}>
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            aria-pressed={selected === tag}
                            className={`${styles.tag} ${selected === tag ? styles.tagSelected : ''}`}
                            onClick={() => toggle(tag)}
                        >
                            :{tag}:
                        </button>
                    ))}
                </div>
            )}

            <ul className={styles.postList}>
                {visible.map((post) => (
                    <li key={post.slug}>
                        <a href={post.slug}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
