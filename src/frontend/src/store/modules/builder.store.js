import {
  // SET_ENTITY,
  // DELETE_ENTITY,
  CHANGE_DOUGH,
  CHANGE_SIZE,
  CHANGE_SAUCE,
  CHANGE_COUNTER,
  SWITCH_CLASS_PIZZA,
  UPDATE_NAME_PIZZA,
  UPDATE_TOTAL_PRICE,
  RESET_BUILDER,
} from "@/store/mutation-types";
import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
  // capitalize,
} from "@/common/helpers";
import jsonPizza from "@/static/pizza.json";

// const entity = "builder";
// const module = capitalize(entity);
// const namespace = { entity, module };

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
        id: jsonPizza.dough.map((item) => normalizeDough(item))[0].id,
        value: jsonPizza.dough.map((item) => normalizeDough(item))[0].type,
        price: jsonPizza.dough.map((item) => normalizeDough(item))[0].price,
      },
      size: {
        id: jsonPizza.sizes.map((item) => normalizeSizes(item))[1].id,
        value: jsonPizza.sizes.map((item) => normalizeSizes(item))[1].size,
        multiplier: jsonPizza.sizes.map((item) => normalizeSizes(item))[1]
          .multiplier,
      },
      sauce: {
        id: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].id,
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

    NAME_PIZZA: (state) => {
      return state.composition.namePizza;
    },
  },

  mutations: {
    [CHANGE_DOUGH]: (state, payload) => {
      let price;
      state.doughs.filter((item) => {
        if (item.type == payload.value) {
          price = item.price;
        }
      });
      state.composition.dough.value = payload.value;
      state.composition.dough.price = price;
    },

    [CHANGE_SIZE]: (state, payload) => {
      let multiplier;
      state.sizes.filter((item) => {
        if (item.size == payload.value) {
          multiplier = item.multiplier;
        }
      });
      state.composition.size.value = payload.value;
      state.composition.size.multiplier = multiplier;
    },

    [CHANGE_SAUCE]: (state, payload) => {
      state.composition.sauce = payload;
    },

    [SWITCH_CLASS_PIZZA]: (state) => {
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

    [CHANGE_COUNTER]: (state, payload) => {
      state.composition.ingr.filter((item, index) => {
        if (item.id == payload.id) {
          state.composition.ingr[index].count = +payload.newCount;

          let filling = state.composition.ingr
            .filter((item) => {
              return item.count > 0;
            })
            .map((item) => {
              item = {
                id: item.id,
                count: item.count,
                name: item.label,
                title: item.name.toLowerCase(),
              };
              return item;
            });
          state.composition.pizzaFilling = filling;
          return index;
        }
      });
    },

    [UPDATE_NAME_PIZZA]: (state, payload) => {
      state.composition.namePizza = payload;
    },

    [UPDATE_TOTAL_PRICE]: (state) => {
      let newArr = [];
      state.composition.ingr
        .filter((item) => {
          return item.count > 0;
        })
        .forEach((element) => {
          newArr.push(element.count * element.price);
        });
      let multi = newArr.reduce((sum, current) => sum + current, 0);
      // (Основа + Соус + Добавки) * размер
      let newTotalPrice =
        (state.composition.dough.price +
          state.composition.sauce.price +
          multi) *
        state.composition.size.multiplier;
      state.composition.totalPrice = newTotalPrice;
    },

    [RESET_BUILDER]: (state) => {
      let start = {
        dough: {
          id: jsonPizza.dough.map((item) => normalizeDough(item))[0].id,
          value: jsonPizza.dough.map((item) => normalizeDough(item))[0].type,
          price: jsonPizza.dough.map((item) => normalizeDough(item))[0].price,
        },
        size: {
          id: jsonPizza.sizes.map((item) => normalizeSizes(item))[1].id,
          value: jsonPizza.sizes.map((item) => normalizeSizes(item))[1].size,
          multiplier: jsonPizza.sizes.map((item) => normalizeSizes(item))[1]
            .multiplier,
        },
        sauce: {
          id: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].id,
          value: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].value,
          price: jsonPizza.sauces.map((item) => normalizeSauces(item))[0].price,
        },
        ingr: jsonPizza.ingredients.map((item) => normalizeIngredients(item)),
        totalPrice: 0,
        classPizza: "pizza--foundation--small-tomato",
        pizzaFilling: [],
        namePizza: "",
      };
      state.composition = start;
    },
  },

  actions: {
    // query({ commit }) {
    //   const data = jsonPizza.map((task) => normalizeDough(task));
    //   commit(
    //     SET_ENTITY,
    //     {
    //       ...namespace,
    //       value: data,
    //     },
    //     { root: true }
    //   );
    // },

    changeDough({ commit }, data) {
      commit(
        CHANGE_DOUGH,
        {
          value: data.value,
        },
        { root: false }
      );
    },

    changeSize({ commit }, data) {
      commit(
        CHANGE_SIZE,
        {
          value: data.value,
          multiplier: data.multiplier,
        },
        { root: false }
      );
    },

    changeSauce({ commit }, data) {
      commit(
        CHANGE_SAUCE,
        {
          value: data.value,
          price: data.price,
        },
        { root: false }
      );
    },

    changeCounter({ commit }, data) {
      commit(
        CHANGE_COUNTER,
        {
          newCount: data.newCount,
          id: data.id,
        },
        { root: false }
      );
    },

    changeNamePizza({ commit }, data) {
      commit(UPDATE_NAME_PIZZA, data);
    },

    changeTotalPrice({ commit }) {
      commit(UPDATE_TOTAL_PRICE);
    },

    resetBuilder({ commit }) {
      commit(RESET_BUILDER);
    },
  },
};
