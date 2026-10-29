import Link from 'next/link';
import { getPostsInCategory } from '@/lib/api';
import { formatPostDate } from '@/utils/posts';
import styles from './page.module.scss';

export default async function Blog() {
    const posts = await getPostsInCategory('blog');

    return (
        <div>
            <h1>Blog</h1>

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <div className={styles.list}>
                    {posts.map((post) => (
                        <Link key={post.data.slug} href={post.data.slug} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.title}>{post.data.title || post.data.slug}</span>
                                {post.data.date && <span className={styles.date}>{formatPostDate(post.data.date)}</span>}
                            </div>
                            {post.data.description && <p className={styles.desc}>{post.data.description}</p>}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
