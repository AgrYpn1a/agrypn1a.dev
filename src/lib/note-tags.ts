// Tags used to classify notes. Values match org `#+filetags:` entries, e.g. `:math:dvs:`.

export const MAIN_CATEGORIES = ['math', 'cs', 'phil', 'christ', 'cars', 'litr'] as const;

export type MainCategory = (typeof MAIN_CATEGORIES)[number];

export const SUB_CATEGORIES = {
    math: ['dvs', 'tg'],
    cs: ['alg', 'low', 'clang', 'sc'],
    phil: ['krkrgd'],
    christ: ['asct', 'thlg', 'cmnt'],
    cars: ['rx8', 'rx7fc', '13b'],
    litr: ['fnts', 'phil', 'art', 'clsc'],
} as const satisfies Partial<Record<MainCategory, readonly string[]>>;

export type SubCategory = (typeof SUB_CATEGORIES)[keyof typeof SUB_CATEGORIES][number];

export const CATEGORY_LABELS: Record<MainCategory | SubCategory, string> = {
    math: 'Math',
    cs: 'Computer Science',
    phil: 'Philosophy',
    christ: 'Christianity',
    cars: 'Cars and Engines',
    litr: 'Literature',
    dvs: 'Probability and Statistics',
    tg: 'Graph Theory',
    alg: 'Algorithms',
    low: 'Low level',
    clang: 'C Language',
    sc: 'Scala',
    krkrgd: 'Kierkegaard',
    asct: 'Ascetic Notes',
    thlg: 'Theology',
    cmnt: 'Commentaries',
    rx8: 'Mazda RX-8',
    rx7fc: 'Mazda RX-7 FC',
    '13b': '13B Engine',
    fnts: 'Epic Fantasy',
    art: 'Art',
    clsc: 'Classics',
};

export const isMainCategory = (tag: string): tag is MainCategory => (MAIN_CATEGORIES as readonly string[]).includes(tag);

export const getSubCategories = (category: MainCategory): readonly SubCategory[] =>
    (SUB_CATEGORIES as Partial<Record<MainCategory, readonly SubCategory[]>>)[category] ?? [];

// A note belongs to a main category if it is tagged with it or with any of its subcategories,
// so `:dvs:` alone is enough to place a note under math.
export const isInCategory = (tags: string[], category: MainCategory, subCategory?: SubCategory): boolean => {
    if (subCategory) {
        return getSubCategories(category).includes(subCategory) && tags.includes(subCategory);
    }
    return tags.includes(category) || getSubCategories(category).some((sub) => tags.includes(sub));
};
