'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import styles from './page.module.scss';

export type DumpPost = {
    slug: string;
    title: string;
    // Category keys, e.g. `math` and `math/dvs`.
    categories: string[];
};

export type DumpTag = {
    key: string;
    tag: string;
    label: string;
    sub: boolean;
};

export default function OrgDump({ posts, tags }: { posts: DumpPost[]; tags: DumpTag[] }) {
    const [selected, setSelected] = useState<string | null>(null);
    const [query, setQuery] = useState('');

    const toggle = (key: string) => setSelected((current) => (current === key ? null : key));

    const counts = useMemo(() => {
        const result = new Map<string, number>();
        posts.forEach((post) => post.categories.forEach((key) => result.set(key, (result.get(key) ?? 0) + 1)));
        return result;
    }, [posts]);

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return posts.filter(
            (post) =>
                (!selected || post.categories.includes(selected)) &&
                (!needle || post.title.toLowerCase().includes(needle))
        );
    }, [posts, selected, query]);

    // The list scrolls with the page, so the virtualizer needs to know where it starts.
    const listRef = useRef<HTMLUListElement>(null);
    const [scrollMargin, setScrollMargin] = useState(0);
    useLayoutEffect(() => {
        setScrollMargin(listRef.current?.offsetTop ?? 0);
    }, []);

    const virtualizer = useWindowVirtualizer({
        count: visible.length,
        estimateSize: () => 32,
        overscan: 10,
        scrollMargin,
    });

    return (
        <div>
            <div className={styles.tags}>
                {tags.map(({ key, tag, label, sub }) => {
                    const count = counts.get(key) ?? 0;
                    return (
                        <button
                            key={key}
                            type="button"
                            title={label}
                            disabled={count === 0}
                            aria-pressed={selected === key}
                            className={`${styles.tag} ${sub ? styles.tagSub : ''} ${selected === key ? styles.tagSelected : ''}`}
                            onClick={() => toggle(key)}
                        >
                            :{tag}:
                        </button>
                    );
                })}
            </div>

            <input
                type="search"
                className={styles.search}
                placeholder="search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search notes by title"
            />

            <div className={styles.resultCount}>
                {visible.length} / {posts.length}
            </div>

            <ul ref={listRef} className={styles.postList} style={{ height: virtualizer.getTotalSize() }}>
                {virtualizer.getVirtualItems().map((item) => {
                    const post = visible[item.index];
                    return (
                        <li
                            key={post.slug}
                            data-index={item.index}
                            ref={virtualizer.measureElement}
                            className={styles.postItem}
                            style={{ transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)` }}
                        >
                            <a href={post.slug}>{post.title}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
