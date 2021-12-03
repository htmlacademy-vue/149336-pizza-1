import uniqueId from "lodash/uniqueId";
import cloneDeep from "lodash/cloneDeep";
import {
  SET_ENTITY,
  CREATE_PIZZA,
  UPDATE_PIZZA,
  UPDATE_TOTAL_PRICE_ORDER,
  RESET_PIZZAS,
  UPDATE_USER_ADDRESS,
  UPDATE_RECIPIENT,
  RESET_USER_ADDRESS,
  UPDATE_PHONE,
} from "@/store/mutation-types";

// const entity = "cart";
// const module = capitalize(entity);
// const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    phone: "",
    pizzas: [],
    misc: [],
    totalPriceOrder: 0,
    address: {
      street: "",
      house: "",
      apartment: "",
    },
    recipient: "myself",
  },
  getters: {
    pizzas: (state) => {
      return state.pizzas;
    },

    misc: (state) => {
      return state.misc;
    },

    address: (state) => {
      return state.address;
    },
  },
  mutations: {
    [CREATE_PIZZA]: (state, payload) => {
      const data = cloneDeep(payload.rootData.Builder.composition);
      let fillings = "";
      payload.rootData.Builder.composition.pizzaFilling.forEach((item) => {
        fillings += `${item.title}, `;
      });

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

    [UPDATE_USER_ADDRESS]: (state, payload) => {
      if (payload.data.street) {
        state.address.street = payload.data.street;
      }
      if (payload.data.house) {
        state.address.house = payload.data.house;
      }
      if (payload.data.apartment) {
        state.address.apartment = payload.data.apartment;
      }
    },

    [RESET_USER_ADDRESS]: (state) => {
      state.address.street = "";
      state.address.house = "";
      state.address.apartment = "";
    },

    [UPDATE_RECIPIENT]: (state, payload) => {
      state.recipient = payload.data.recipient;
    },

    [UPDATE_PHONE]: (state, payload) => {
      state.phone = payload.data.phone;
    },
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.misc.query();
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

    updateUserAddress({ commit, rootState }, data) {
      commit(
        UPDATE_USER_ADDRESS,
        {
          data,
          rootData: rootState,
        },
        { root: false }
      );
    },

    updateUserRecipient({ commit }, data) {
      commit(
        UPDATE_RECIPIENT,
        {
          data,
        },
        { root: false }
      );
    },

    resetUserAddress({ commit }) {
      commit(RESET_USER_ADDRESS, { root: false });
    },

    updatePhone({ commit }, data) {
      commit(
        UPDATE_PHONE,
        {
          data,
        },
        { root: false }
      );
    },
  },
};
