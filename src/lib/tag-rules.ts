export type TagExclusionRule = (tag: string) => boolean;

export const excludeDigitsOnly: TagExclusionRule = (tag) => /^\d+$/.test(tag);

export function applyExclusions(tags: string[], rules: TagExclusionRule[]): string[] {
    return tags.filter((tag) => !rules.some((rule) => rule(tag)));
}
