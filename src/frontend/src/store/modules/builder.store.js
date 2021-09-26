import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutation-types";
import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
  capitalize,
} from "@/common/helpers";
import jsonPizza from "@/static/pizza.json";

const entity = "tasks";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
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

    PIZZA_FILLING: (state) => {
      return state.composition.pizzaFilling;
    },
    // sidebarTasksCount: (state) =>
    //   state.tasks.filter(({ columnId }) => !columnId).length,
    // getTaskById: (state) => (id) =>
    //   state.tasks.find((task) => +task.id === +id),
  },

  mutations: {
    SET_COMPOSITION: (state, payload) => {
      state.composition = payload;
    },

    ADD_PIZZA_FILLING: (state, payload) => {
      state.composition.pizzaFilling.push(payload);
    },

    UPDATE_PIZZA_FILLING: (state, id, count) => {
      state.composition.pizzaFilling.filter((e) => {
        +e.id === +id;
        e.count = count;
      });
    },

    DELETE_PIZZA_FILLING: (state, id) => {
      state.composition.pizzaFilling.filter((e) => +e.id !== +id);
    },
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
