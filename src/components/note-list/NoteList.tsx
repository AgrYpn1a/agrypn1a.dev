import Link from 'next/link';
import { Post } from '@/lib/api';

const NoteList = ({ posts }: { posts: Post[] }) => {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.data.slug}>
                    <Link href={post.data.slug}>{post.data.title || post.data.slug}</Link>
                </li>
            ))}
        </ul>
    );
};

export { NoteList };
