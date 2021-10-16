import {
  // SET_ENTITY,
  // DELETE_ENTITY,
  CHANGE_USER_PHONE,
} from "@/store/mutation-types";
import user from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user: user[0],
  },
  getters: {
    USER: (state) => {
      return state.user;
    },
  },
  mutations: {
    [CHANGE_USER_PHONE]: (state, payload) => {
      state.user.phone = payload.value;
      console.log(payload.value);
    },
  },
  actions: {
    changeUserPhone({ commit }, data) {
      commit(
        CHANGE_USER_PHONE,
        {
          value: data.value,
        },
        { root: false }
      );
    },
  },
};
