import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getTags } from '@/lib/api';
import { CATEGORY_LABELS, MAIN_CATEGORIES, SubCategory, getSubCategories, isInCategory, isMainCategory } from '@/lib/note-tags';
import { NoteList } from '@/components/note-list/NoteList';
import styles from '../../page.module.scss';

export async function generateStaticParams() {
    return MAIN_CATEGORIES.flatMap((category) =>
        getSubCategories(category).map((subcategory) => ({ category, subcategory }))
    );
}

type DynamicParams = {
    params: Promise<{ category: string; subcategory: string }>;
};

export default async function NotesSubCategory({ params }: DynamicParams) {
    const { category, subcategory } = await params;
    if (!isMainCategory(category) || !getSubCategories(category).includes(subcategory as SubCategory)) {
        notFound();
    }
    const sub = subcategory as SubCategory;

    const posts = (await getAllPosts()).filter((post) => isInCategory(getTags(post), category, sub));

    return (
        <div>
            <div className={styles.breadcrumb}>
                <Link href="/notes">notes</Link> / <Link href={`/notes/${category}`}>{category}</Link> / {sub}
            </div>
            <h1>{CATEGORY_LABELS[sub]}</h1>

            <NoteList posts={posts} />
        </div>
    );
}
