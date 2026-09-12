import { getPostsInCategory } from '@/lib/api';

export default async function Blog() {
    const posts = await getPostsInCategory('blog');

    return (
        <div>
            <h2>Blog</h2>
            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.data.slug}>
                            <a href={post.data.slug}>{post.data.title || post.data.slug}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
