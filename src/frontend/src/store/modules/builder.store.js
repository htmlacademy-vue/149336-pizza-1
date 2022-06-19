import {
  SET_ENTITY,
  SET_LONG_ENTITY,
  CHANGE_DOUGH,
  CHANGE_SIZE,
  CHANGE_SAUCE,
  CHANGE_COUNTER,
  SWITCH_CLASS_PIZZA,
  UPDATE_NAME_PIZZA,
  UPDATE_TOTAL_PRICE,
  RESET_BUILDER,
} from "@/store/mutation-types";

// const entity = "builder";
// const module = capitalize(entity);
// const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    doughs: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    composition: {
      dough: {},
      size: {},
      sauce: {},
      ingr: [],
      // totalPrice: 0,
      classPizza: "pizza--foundation--small-creamy",
      pizzaFilling: [],
      namePizza: "",
    },
  },

  getters: {
    getTotalPrice: (state) => {
      let multi;
      let newArr = [];
      state.composition.pizzaFilling.forEach((element) => {
        newArr.push(element.count * element.price);
      });
      if (newArr.length !== 0) {
        multi = newArr.reduce((sum, current) => sum + current, 0);
      } else {
        multi = 0;
      }
      // (Основа + Соус + Добавки) * размер
      let newTotalPrice =
        (state.composition.dough.price +
          state.composition.sauce.price +
          multi) *
        state.composition.size.multiplier;
      // state.composition.totalPrice = newTotalPrice;
      // return state.composition.totalPrice;
      return newTotalPrice;
    },
  },

  mutations: {
    [CHANGE_DOUGH]: (state, payload) => {
      let price, id;
      state.doughs.forEach((item) => {
        if (item.type == payload.value) {
          price = item.price;
          id = item.id;
        }
      });
      state.composition.dough.value = payload.value;
      state.composition.dough.price = price;
      state.composition.dough.id = id;
    },

    [CHANGE_SIZE]: (state, payload) => {
      let multiplier, id;
      state.sizes.forEach((item) => {
        if (item.size == payload.value) {
          multiplier = item.multiplier;
          id = item.id;
        }
      });
      state.composition.size.value = payload.value;
      state.composition.size.multiplier = multiplier;
      state.composition.size.id = id;
    },

    [CHANGE_SAUCE]: (state, payload) => {
      let price, id;
      state.sauces.forEach((item) => {
        if (item.value == payload.value) {
          id = item.id;
          price = item.price;
        }
      });
      state.composition.sauce.value = payload.value;
      state.composition.sauce.price = price;
      state.composition.sauce.id = id;
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
      state.composition.ingr.forEach((item, index) => {
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
                price: item.price,
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
      state.composition.dough = {
        id: 1,
        value: "large",
        price: 300,
      };
      state.composition.size = {
        id: 2,
        value: "normal",
        multiplier: 2,
      };
      state.composition.sauce = {
        id: 2,
        value: "creamy",
        price: 50,
      };
      state.composition.totalPrice = 700;
      state.composition.classPizza = "pizza--foundation--small-creamy";
      state.composition.pizzaFilling = [];
      state.composition.namePizza = "";
      state.composition.id = null;
      state.ingredients.forEach((item) => (item.count = 0));
    },
  },

  actions: {
    async queryDough({ commit }) {
      const data = await this.$api.dough.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "doughs",
          value: data,
        },
        { root: true }
      );
      const dough = {
        id: data[0].id,
        value: data[0].type,
        price: data[0].price,
      };
      commit(
        SET_LONG_ENTITY,
        {
          module: "Builder",
          path: "composition",
          entity: "dough",
          value: dough,
        },
        { root: true }
      );
    },

    async querySizes({ commit }) {
      const data = await this.$api.sizes.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "sizes",
          value: data,
        },
        { root: true }
      );
      const size = {
        id: data[1].id,
        value: data[1].size,
        multiplier: data[1].multiplier,
      };
      commit(
        SET_LONG_ENTITY,
        {
          module: "Builder",
          path: "composition",
          entity: "size",
          value: size,
        },
        { root: true }
      );
    },

    async querySauces({ commit }) {
      const data = await this.$api.sauces.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "sauces",
          value: data,
        },
        { root: true }
      );
      const sauce = {
        id: data[0].id,
        value: data[0].value,
        price: data[0].price,
      };
      commit(
        SET_LONG_ENTITY,
        {
          module: "Builder",
          path: "composition",
          entity: "sauce",
          value: sauce,
        },
        { root: true }
      );
    },

    async queryIngridients({ commit }) {
      const data = await this.$api.ingredients.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "ingredients",
          value: data,
        },
        { root: true }
      );
      commit(
        SET_LONG_ENTITY,
        {
          module: "Builder",
          path: "composition",
          entity: "ingr",
          value: data,
        },
        { root: true }
      );
    },

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
        },
        { root: false }
      );
    },

    changeSauce({ commit }, data) {
      commit(
        CHANGE_SAUCE,
        {
          value: data.value,
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

    switchClassPizza({ commit }, data) {
      commit(SWITCH_CLASS_PIZZA, data);
    },

    changeTotalPrice({ commit }) {
      commit(UPDATE_TOTAL_PRICE);
    },

    resetBuilder({ commit }) {
      commit(RESET_BUILDER);
    },
  },
};
