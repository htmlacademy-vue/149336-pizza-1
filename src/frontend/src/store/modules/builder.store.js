import {
  SET_ENTITY,
  DELETE_ENTITY,
  CHANGE_DOUGH,
} from "@/store/mutation-types";
import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
  capitalize,
} from "@/common/helpers";
import jsonPizza from "@/static/pizza.json";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    doughs: jsonPizza.dough.map((item) => normalizeDough(item)),
    sizes: jsonPizza.sizes.map((item) => normalizeSizes(item)),
    sauces: jsonPizza.sauces.map((item) => normalizeSauces(item)),
    ingredients: jsonPizza.ingredients.map((item) =>
      normalizeIngredients(item)
    ),
    composition: {
      dough: {
        value: jsonPizza.dough.map((item) => normalizeDough(item))[0].type,
        price: jsonPizza.dough.map((item) => normalizeDough(item))[0].price,
      },
      size: {
        value: jsonPizza.sizes.map((item) => normalizeSizes(item))[1].size,
        multiplier: jsonPizza.sizes.map((item) => normalizeSizes(item))[1]
          .multiplier,
      },
      sauce: {
        value: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].value,
        price: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].price,
      },
      ingr: jsonPizza.ingredients.map((item) => normalizeIngredients(item)),
      totalPrice: 0,
      classPizza: "pizza--foundation--small-tomato",
      pizzaFilling: [],
      namePizza: "",
    },
  },

  getters: {
    COMPOSITION: (state) => {
      return state.composition;
    },

    DOUGHS: (state) => {
      return state.doughs;
    },

    SIZES: (state) => {
      return state.sizes;
    },

    SAUCES: (state) => {
      return state.sauces;
    },

    PIZZA_FILLING: (state) => {
      return state.composition.pizzaFilling;
    },
  },

  mutations: {
    // SET_COMPOSITION: (state, payload) => {
    //   state.composition = payload;
    // },

    // ADD_PIZZA_FILLING: (state, pizza) => {
    //   // state.composition.pizzaFilling.push(pizza);
    //   state.composition.pizzaFilling = [
    //     ...state.composition.pizzaFilling,
    //     pizza,
    //   ];
    // },

    // UPDATE_PIZZA_FILLING: (state, id, count) => {
    //   state.composition.pizzaFilling.filter((e) => {
    //     +e.id === +id;
    //     e.count = count;
    //   });
    // },

    // DELETE_PIZZA_FILLING: (state, id) => {
    //   state.composition.pizzaFilling.filter((e) => +e.id !== +id);
    // },

    // UPDATE_BUILDER: (state, payload) => {
    // },

    [CHANGE_DOUGH]: (state, payload) => {
      state.composition.dough = payload;
      // payload = {value: payload.value, price: payload.price}
    },

    CHANGE_SIZE: (state, payload) => {
      state.composition.size = payload;
      // payload = {value: payload.value, multiplier: payload.multiplier}
    },

    CHANGE_SOUCE: (state, payload) => {
      state.composition.sauce = payload;
      // payload = {value: payload.value, price: payload.price}
    },

    SWITCH_CLASS_PIZZA: (state) => {
      let classPizza = "pizza--foundation";
      switch (state.composition.dough.value) {
        case "light":
          classPizza = `${classPizza}--small`;
          break;
        case "large":
          classPizza = `${classPizza}--big`;
          break;
      }
      switch (state.composition.sauce.value) {
        case "tomato":
          classPizza = `${classPizza}-tomato`;
          break;
        case "creamy":
          classPizza = `${classPizza}-creamy`;
          break;
      }
      state.composition.classPizza = classPizza;
    },
    // CHANGE_COUNTER: (state, payload) => {
    // },
  },

  actions: {
    query({ commit }) {
      const data = jsonPizza.map((task) => normalizeDough(task));
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    changeDough({ commit }, data) {
      commit(
        CHANGE_DOUGH,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    delete({ commit }, id) {
      // TODO: Add api call
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id,
        },
        { root: true }
      );
    },
  },
};
