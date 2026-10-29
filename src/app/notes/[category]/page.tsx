import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getTags } from '@/lib/api';
import { CATEGORY_LABELS, MAIN_CATEGORIES, getSubCategories, isInCategory, isMainCategory } from '@/lib/note-tags';
import { NoteList } from '@/components/note-list/NoteList';
import { CategoryLink } from '../CategoryLink';
import styles from '../page.module.scss';

export async function generateStaticParams() {
    return MAIN_CATEGORIES.map((category) => ({ category }));
}

type DynamicParams = {
    params: Promise<{ category: string }>;
};

export default async function NotesCategory({ params }: DynamicParams) {
    const { category } = await params;
    if (!isMainCategory(category)) {
        notFound();
    }

    const posts = (await getAllPosts()).filter((post) => isInCategory(getTags(post), category));
    const subCategories = getSubCategories(category);

    return (
        <div>
            <div className={styles.breadcrumb}>
                <Link href="/notes">notes</Link> / {category}
            </div>
            <h1>{CATEGORY_LABELS[category]}</h1>

            {subCategories.length > 0 && (
                <ul className={styles.subcategories}>
                    {subCategories.map((sub) => (
                        <li key={sub}>
                            <CategoryLink
                                href={`/notes/${category}/${sub}`}
                                empty={!posts.some((post) => isInCategory(getTags(post), category, sub))}
                            >
                                {CATEGORY_LABELS[sub]}
                            </CategoryLink>
                        </li>
                    ))}
                </ul>
            )}

            <NoteList posts={posts} />
        </div>
    );
}
