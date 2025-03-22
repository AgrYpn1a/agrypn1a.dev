import React from 'react';
import { join } from 'path';
import Head from 'next/head';
import { getAllPaths, getPostBySlug } from '@/lib/api';
import Link from 'next/link';
import Rehype from '@/components/Rehype';

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
    const paths = await getAllPaths();

    return paths.map((path) => ({
        slug: [path.replace(/\.org$/, '')],
    }));
    // return {
    // slug: ['id', 'content']
    // }
    // add '/' which is synonymous to '/index'
    // paths.push('/');

    // console.log('[generateStaticParams]', { paths });

    // return {
    //     paths,
    //     fallback: false,
    // };

    // const posts = await getAllPostsWithoutBody();

    // return posts?.map((post) => {
    //   return {
    //     // TODO: We really want to use slug instead of id
    //     // but there is no known way to achieve this ATM.
    //     slug: [post.id, parsePostSlug(post.url)],
    //   };
    // });
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
            <Head>
                <title>Rastko Tojagic</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
                    integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
                    crossOrigin="anonymous"
                />
            </Head>
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
    params: Promise<{ post: string }>;
};

export default async function PostPage({ params }: DynamicParams) {
    const { post } = await params;
    const slug = `/org${post.reduce((r, p) => `${r}/${p}`, '')}`;

    const postData = await getPostBySlug(slug);

    return <Note title={postData?.data.title} hast={postData?.result} backlinks={[]} />;
}
