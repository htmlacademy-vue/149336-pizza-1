import { uniqueId, cloneDeep } from "lodash";
import {
  SET_ENTITY,
  // DELETE_ENTITY,
  CREATE_PIZZA,
  UPDATE_PIZZA,
  UPDATE_TOTAL_PRICE_ORDER,
  RESET_PIZZAS,
} from "@/store/mutation-types";
import { normalizeMisc /*, capitalize*/ } from "@/common/helpers";
import jsonMisc from "@/static/misc.json";

// const entity = "cart";
// const module = capitalize(entity);
// const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizzas: [],
    misc: [],
    totalPriceOrder: 0,
  },
  getters: {
    PIZZAS: (state) => {
      return state.pizzas;
    },

    MISC: (state) => {
      return state.misc;
    },
  },
  mutations: {
    [CREATE_PIZZA]: (state, payload) => {
      const data = cloneDeep(payload.rootData.Builder.composition);
      let fillings = "";
      payload.rootData.Builder.composition.pizzaFilling.forEach((item) => {
        fillings += `${item.title}, `;
      });

      // const pizza = {
      //   name: "",
      //   sauceId: 0,
      //   doughId: 0,
      //   sizeId: 0,
      //   quantity: 0,
      //   ingredients: [
      //     {
      //       ingredientId: 0,
      //       quantity: 0,
      //     },
      //   ],
      // };

      let pizza = {
        composition: data,
        id: uniqueId(),
        count: 1,
        title: payload.rootData.Builder.composition.namePizza,
        size:
          payload.rootData.Builder.composition.size.value === "normal"
            ? 32
            : payload.rootData.Builder.composition.size.value === "big"
            ? 45
            : 23,
        dough:
          payload.rootData.Builder.composition.dough.value === "large"
            ? "толстом"
            : "тонком",
        sauce:
          payload.rootData.Builder.composition.sauce.value === "tomato"
            ? "томатный"
            : "сливочный",
        fillings: fillings.slice(0, -2),
        price: payload.rootData.Builder.composition.totalPrice,
      };
      state.pizzas.push(pizza);
    },
    [UPDATE_PIZZA]: (state, payload) => {
      console.log(state, payload);
      payload.rootData.Builder.composition = payload.data.composition;
    },
    [UPDATE_TOTAL_PRICE_ORDER]: (state, payload) => {
      let pizzasPrice = 0,
        miscsPrice = 0;
      payload.rootData.Cart.pizzas
        .filter((pizza) => {
          return pizza.count > 0;
        })
        .forEach((pizza) => {
          pizzasPrice += pizza.count * pizza.price;
        });
      payload.rootData.Cart.misc
        .filter((misc) => {
          return misc.count > 0;
        })
        .forEach((misc) => {
          miscsPrice += misc.count * misc.price;
        });
      state.totalPriceOrder = pizzasPrice + miscsPrice;
    },
    [RESET_PIZZAS]: (state) => {
      state.misc.forEach((misc) => (misc.count = 0));
      state.pizzas = [];
      state.totalPriceOrder = 0;
    },
  },
  actions: {
    query({ commit }) {
      const data = jsonMisc.map((item) => normalizeMisc(item)); // TODO: Add api call
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "misc",
          value: data,
        },
        { root: true }
      );
    },

    createPizza({ commit, rootState }, data) {
      commit(
        CREATE_PIZZA,
        {
          data,
          rootData: rootState,
        },
        { root: false }
      );
    },

    updatePizza({ commit, rootState }, data) {
      commit(
        UPDATE_PIZZA,
        {
          data,
          rootData: rootState,
        },
        { root: false }
      );
    },

    updateTotalPriceOrder({ commit, rootState }) {
      commit(
        UPDATE_TOTAL_PRICE_ORDER,
        {
          rootData: rootState,
        },
        { root: false }
      );
    },

    resetPizzas({ commit }) {
      commit(RESET_PIZZAS);
    },
  },
};
