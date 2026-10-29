import { getAllPosts, getTags } from '@/lib/api';
import { CATEGORY_LABELS, MAIN_CATEGORIES, getSubCategories, isInCategory } from '@/lib/note-tags';
import { CategoryLink } from './CategoryLink';
import NotesGraph, { GraphLink, GraphNode } from './NotesGraph';
import styles from './page.module.scss';

export default async function Notes() {
    const posts = await getAllPosts();
    const postTags = posts.map(getTags);

    const graphNodes: GraphNode[] = posts.map((post, i) => ({
        id: post.data.slug,
        title: post.data.title || post.data.slug,
        category: MAIN_CATEGORIES.find((category) => isInCategory(postTags[i], category)) ?? null,
    }));

    // One undirected edge per linked pair; links to missing notes and self-links are dropped.
    const slugs = new Set(graphNodes.map((node) => node.id));
    const edges = new Map<string, GraphLink>();
    posts.forEach((post) =>
        (post.data.links ?? []).forEach((link) => {
            const target = decodeURIComponent(link);
            if (target === post.data.slug || !slugs.has(target)) return;
            const [source, other] = [post.data.slug, target].sort();
            edges.set(`${source}|${other}`, { source, target: other });
        })
    );

    const graphCategories = MAIN_CATEGORIES.map((key) => ({ key, label: CATEGORY_LABELS[key] }));

    return (
        <div>
            <div className={styles.heading}>
                <h1>Notes</h1>
                <NotesGraph nodes={graphNodes} links={Array.from(edges.values())} categories={graphCategories} />
            </div>

            <div className={styles.masonry}>
                {MAIN_CATEGORIES.map((category) => {
                    const count = postTags.filter((tags) => isInCategory(tags, category)).length;
                    const subCategories = getSubCategories(category);

                    return (
                        <div key={category} className={styles.category}>
                            <CategoryLink href={`/notes/${category}`} empty={count === 0} className={styles.categoryLink}>
                                <span>{CATEGORY_LABELS[category]}</span>
                                <span className={styles.count}>{count}</span>
                            </CategoryLink>
                            {subCategories.length > 0 && (
                                <ul className={styles.subcategories}>
                                    {subCategories.map((sub) => (
                                        <li key={sub}>
                                            <CategoryLink
                                                href={`/notes/${category}/${sub}`}
                                                empty={!postTags.some((tags) => isInCategory(tags, category, sub))}
                                            >
                                                {CATEGORY_LABELS[sub]}
                                            </CategoryLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
