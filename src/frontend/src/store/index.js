import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";
import jsonUsers from "@/static/user.json";
import { uniqueId } from "lodash";

Vue.use(Vuex);

const state = () => ({
  order: [],
  user: [],
});

const getters = {
  USER: (state) => {
    return state.user;
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("fetchUsers");
    dispatch("Cart/query");
  },
  fetchUsers({ commit }) {
    const user = jsonUsers; // TODO: Add api call
    commit(SET_ENTITY, {
      module: null,
      entity: "user",
      value: { ...user, userId: uniqueId() },
    });
  },
};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },

  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },

  [UPDATE_ENTITY](state, { module, entity, value }) {
    // делаем для указанного модуля
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    }
    // делаем для корневого модуля
    else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },

  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
