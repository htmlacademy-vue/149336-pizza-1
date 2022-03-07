import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  MiscApiService,
  DoughApiService,
  SizesApiService,
  SaucesApiService,
  IngredientsApiService,
  AddressesApiService,
  OrdersApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutation-types";

export const createResources = (notifier) => {
  return {
    [resources.WHOAMI]: new ReadOnlyApiService(resources.WHOAMI, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.MISC]: new MiscApiService(resources.MISC, notifier),
    [resources.DOUGH]: new DoughApiService(resources.DOUGH, notifier),
    [resources.SIZES]: new SizesApiService(resources.SIZES, notifier),
    [resources.SAUCES]: new SaucesApiService(resources.SAUCES, notifier),
    [resources.INGRIDIENTS]: new IngredientsApiService(
      resources.INGRIDIENTS,
      notifier
    ),
    [resources.ADDRESSES]: new AddressesApiService(
      resources.ADDRESSES,
      notifier
    ),
    [resources.ORDERS]: new OrdersApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const totalPrice = (order, store) => {
  debugger;
  const ingrs = store.Builder.ingredients;
  order.orderPizzas.forEach((pizza) => {
    let newIngrs = [];
    pizza.ingredients.forEach((ingr) => {
      let ingrid = ingrs
        .filter((ing) => {
          return ing.id === ingr.ingredientId;
        })
        .map((item) => {
          item = {
            id: item.id,
            ingredientId: ingr.ingredientId,
            pizzaId: ingr.pizzaId,
            quantity: ingr.quantity,
            price: item.price,
          };
          return item;
        });
      newIngrs.push(ingrid[0]);
    });
    pizza.ingredients = newIngrs;
  });

  const doughs = store.Builder.doughs;
  order.orderPizzas.forEach((pizza) => {
    let doug = doughs.filter((dough) => {
      return dough.id === pizza.doughId;
    });
    pizza.doughPrice = doug[0].price;
  });

  const sizes = store.Builder.sizes;
  order.orderPizzas.forEach((pizza) => {
    let siz = sizes.filter((size) => {
      return size.id === pizza.sizeId;
    });
    pizza.sizeMultiplier = siz[0].multiplier;
  });

  const sauces = store.Builder.sauces;
  order.orderPizzas.forEach((pizza) => {
    let sauc = sauces.filter((sauce) => {
      return sauce.id === pizza.sauceId;
    });
    pizza.saucePrice = sauc[0].price;
  });

  if (order.orderMisc.length) {
    const miscs = store.Cart.misc;
    order.orderMisc.forEach((misc) => {
      let mis = miscs.filter((m) => {
        return m.id === misc.miscId;
      });
      misc.price = mis[0].price;
    });
  }

  order.orderPizzas.forEach((pizza) => {
    let newArr = [];
    pizza.ingredients.forEach((element) => {
      newArr.push(element.quantity * element.price);
    });
    let multi = newArr.reduce((sum, current) => sum + current, 0);
    // (Основа + Соус + Добавки) * размер
    let newTotalPrice =
      (pizza.doughPrice + pizza.saucePrice + multi) * pizza.sizeMultiplier;
    pizza.totalPricePizza = newTotalPrice;
  });

  return order;
};
