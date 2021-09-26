import {
  DOUGH_TYPES,
  SIZES,
  SAUCES_VALUE,
  INGREDIENTS_CLASS,
} from "@/common/constants";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    type: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
    isChecked: dough.name === "Тонкое",
  };
};

export const normalizeSizes = (pizzaSizes) => {
  return {
    ...pizzaSizes,
    size: pizzaSizes.multiplier ? SIZES[pizzaSizes.multiplier] : "",
    isChecked: pizzaSizes.id === 2,
  };
};

export const normalizeSauces = (sauces) => {
  return {
    ...sauces,
    value: sauces.id ? SAUCES_VALUE[sauces.id] : "",
    isChecked: sauces.id === 1,
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    label: ingredient.id ? INGREDIENTS_CLASS[ingredient.id] : "",
    count: 0,
  };
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
