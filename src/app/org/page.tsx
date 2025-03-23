import { getAllPosts, Post } from '@/lib/api';
import { transformCategoryName } from '@/utils/posts';

export default async function Articles() {
    const posts = await getAllPosts();
    const postCategoryMap = posts.reduce(
        (map, post) => {
            if (map[post.data.category]) {
                return {
                    ...map,
                    [post.data.category]: [...map[post.data.category], post],
                };
            }

            return {
                ...map,
                [post.data.category]: [post],
            };
        },
        {} as Record<string, Post[]>
    );

    console.log({ postCategoryMap });

    return (
        <div>
            {Object.keys(postCategoryMap).map((category) => {
                const posts = postCategoryMap[category];

                return (
                    <div key={category}>
                        <h2>{transformCategoryName(category)}</h2>
                        <ul>
                            {posts.map((post) => {
                                // console.log({ post });
                                // const href = `${BASE_PATH}/${post.data.slug}`;
                                return (
                                    <li key={post.data.slug}>
                                        <a href={post.data.slug}>{post.data.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
