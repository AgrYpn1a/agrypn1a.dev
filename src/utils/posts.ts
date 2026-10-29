import { capitalizeFirstLetter } from './string';

const CATEGORY_NAME_SEPARATOR = '-';

export const transformCategoryName = (categoryName: string) => {
    return categoryName.split(CATEGORY_NAME_SEPARATOR).reduce((name, part) => `${name}${capitalizeFirstLetter(part)}`, '');
};

// e.g. "January, 2026"
export const formatPostDate = (iso?: string): string => {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return `${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`;
};
