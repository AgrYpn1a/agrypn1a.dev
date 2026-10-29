import { getAllPosts, getTags } from '@/lib/api';
import { CATEGORY_LABELS, MAIN_CATEGORIES, getSubCategories, isInCategory } from '@/lib/note-tags';
import OrgDump, { DumpPost, DumpTag } from './OrgDump';

export default async function Articles() {
    const posts = await getAllPosts();

    // Each post carries the keys of the categories it belongs to: `math` for a main category,
    // `math/dvs` for a subcategory (subcategory tags can repeat across categories, e.g. `phil`).
    const dumpPosts: DumpPost[] = posts.map((post) => {
        const tags = getTags(post);
        return {
            slug: post.data.slug,
            title: post.data.title || post.data.slug,
            categories: MAIN_CATEGORIES.flatMap((category) => [
                ...(isInCategory(tags, category) ? [category] : []),
                ...getSubCategories(category)
                    .filter((sub) => isInCategory(tags, category, sub))
                    .map((sub) => `${category}/${sub}`),
            ]),
        };
    });

    const tags: DumpTag[] = MAIN_CATEGORIES.flatMap((category) => [
        { key: category, tag: category, label: CATEGORY_LABELS[category], sub: false },
        ...getSubCategories(category).map((sub) => ({
            key: `${category}/${sub}`,
            tag: sub,
            label: CATEGORY_LABELS[sub],
            sub: true,
        })),
    ]);

    return <OrgDump posts={dumpPosts} tags={tags} />;
}
