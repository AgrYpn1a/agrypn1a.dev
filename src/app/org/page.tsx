import { getAllPosts, getTags } from '@/lib/api';
import { applyExclusions, excludeDigitsOnly, TagExclusionRule } from '@/lib/tag-rules';
import OrgDump, { DumpPost } from './OrgDump';

const tagExcludeRules: TagExclusionRule[] = [excludeDigitsOnly];

export default async function Articles() {
    const posts = await getAllPosts();

    const dumpPosts: DumpPost[] = posts.map((post) => ({
        slug: post.data.slug,
        title: post.data.title,
        category: post.data.category,
        tags: applyExclusions(getTags(post), tagExcludeRules),
    }));

    const tags = applyExclusions(
        Array.from(new Set(dumpPosts.flatMap((post) => post.tags))).sort(),
        tagExcludeRules
    );

    return <OrgDump posts={dumpPosts} tags={tags} />;
}
