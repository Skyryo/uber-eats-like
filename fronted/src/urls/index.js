const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foodsIndex = (restaurantsId) =>
    `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantsId}/foods`;
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;