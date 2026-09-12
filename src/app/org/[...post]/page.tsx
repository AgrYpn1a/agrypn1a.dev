import React from 'react';
import Link from 'next/link';
import Rehype from '@/components/Rehype';
import { getAllPaths, getPostBySlug } from '@/lib/api';

// import { getAllPaths, getPostBySlug } from '../lib/api';

// import Link from '../components/Link';
// import Rehype from '../components/Rehype';

// export const getStaticPaths = async () => {
//     const paths = await getAllPaths();
//     // add '/' which is synonymous to '/index'
//     paths.push('/');

//     return {
//         paths,
//         fallback: false,
//     };
// }
export async function generateStaticParams() {
    // Read paths from disk. Static export has no running server to fetch from.
    const paths = await getAllPaths();

    return paths
        .map((path) => path.replace(/\.org$/, ''))
        .filter((path) => path.startsWith('/org/'))
        .map((path) => ({
            // Catch-all segment is named `post` (folder is `[...post]`).
            post: path.replace(/^\/org\//, '').split('/'),
        }));
}

// export const getStaticProps = async ({ params }: any) => {
//     const path = '/' + join(...(params.slug || ['index']));
//     const post = await getPostBySlug(path);
//     const data = post.data;
//     const backlinks = await Promise.all([...Array.from(data.backlinks)].map(getPostBySlug));
//     return {
//         props: {
//             title: data.title || post.basename,
//             hast: post.result,
//             backlinks: backlinks.map((b) => ({
//                 path: b.path,
//                 title: b.data.title || b.basename,
//             })),
//         },
//     };
// };

const Note = ({ title, hast, backlinks }: any) => {
    return (
        <main>
            <h1>{title}</h1>
            <Rehype hast={hast} />
            {!!backlinks?.length && (
                <section
                    style={{
                        margin: '2rem 0',
                    }}
                >
                    <hr />
                    <h2>{'Backlinks'}</h2>
                    <ul>
                        {backlinks.map((b: any) => (
                            <li key={b.path}>
                                <Link href={b.path}>{b.title}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
};

type DynamicParams = {
    params: Promise<{ post: string[] }>;
};

export default async function PostPage({ params }: DynamicParams) {
    const { post } = await params;
    const slug = `/org${post.reduce((r, p) => `${r}/${p}`, '')}`;

    // Read from disk. Static export resolves all pages at build time.
    const postData = await getPostBySlug(slug);

    return <Note title={postData?.data.title} hast={postData?.result} backlinks={[]} />;
}
