export const DOUGH_TYPES = [
  {
    label: "Тонкое",
    value: "light",
  },
  {
    label: "Толстое",
    value: "large",
  },
];

export const SIZES = {
  1: "small",
  2: "normal",
  3: "big",
};

export const SAUCES_VALUE = {
  1: "tomato",
  2: "creamy",
};

export const INGREDIENTS_CLASS = {
  1: "mushrooms",
  2: "cheddar",
  3: "salami",
  4: "ham",
  5: "ananas",
  6: "bacon",
  7: "onion",
  8: "chile",
  9: "jalapeno",
  10: "olives",
  11: "tomatoes",
  12: "salmon",
  13: "mozzarella",
  14: "parmesan",
  15: "blue_cheese",
};

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 3 * SEC;

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
export const phoneRegex = /!^\+7 \(\d{3}\) \d{3}(-\d{2}){2}$!/;
/* eslint-enable */
