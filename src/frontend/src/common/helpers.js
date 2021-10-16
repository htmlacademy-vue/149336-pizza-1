import {
  DOUGH_TYPES,
  SIZES,
  SAUCES_VALUE,
  INGREDIENTS_CLASS,
} from "@/common/constants";
import { uniqueId } from "lodash";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    id: uniqueId(),
    type: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
    isChecked: dough.name === "Тонкое",
  };
};

export const normalizeSizes = (pizzaSizes) => {
  return {
    ...pizzaSizes,
    id: uniqueId(),
    size: pizzaSizes.multiplier ? SIZES[pizzaSizes.multiplier] : "",
    isChecked: pizzaSizes.id === 2,
  };
};

export const normalizeSauces = (sauces) => {
  return {
    ...sauces,
    id: uniqueId(),
    value: sauces.id ? SAUCES_VALUE[sauces.id] : "",
    isChecked: sauces.id === 1,
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    id: uniqueId(),
    label: ingredient.id ? INGREDIENTS_CLASS[ingredient.id] : "",
    count: 0,
  };
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    id: uniqueId(),
    count: 0,
  };
};
