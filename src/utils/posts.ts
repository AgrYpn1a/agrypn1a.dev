import { capitalizeFirstLetter } from './string';

const CATEGORY_NAME_SEPARATOR = '-';

export const transformCategoryName = (categoryName) => {
    return categoryName.split(CATEGORY_NAME_SEPARATOR).reduce((name, part) => `${name}${capitalizeFirstLetter(part)}`, '');
};
