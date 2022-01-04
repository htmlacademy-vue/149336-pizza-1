import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
    addresses: null,
  },
  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "isAuthenticated", value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "isAuthenticated", value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logout", false);
      }
    },

    async queryAddresses({ commit }) {
      const data = await this.$api.addresses.get();
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },

    async newAddresses({ commit }, address) {
      const data = await this.$api.addresses.post(address);
      commit(
        ADD_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },

    async updateAddresses({ commit }, address) {
      await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: address,
        },
        { root: true }
      );
    },

    async deleteAddress({ commit }, address) {
      await this.$api.addresses.delete(address);
      commit(
        DELETE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          id: address.id,
        },
        { root: true }
      );
    },
  },
};
