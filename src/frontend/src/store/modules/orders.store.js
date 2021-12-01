import { SET_ENTITY, ADD_ENTITY, DELETE_ENTITY } from "@/store/mutation-types";
import { totalPrice } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    orders: (state) => {
      return state.orders;
    },
  },
  mutations: {},
  actions: {
    async queryOrders({ commit, rootState }) {
      const data = await this.$api.orders.get();
      let newData = [];
      data.forEach((order) => {
        newData.push(totalPrice(order, rootState));
      });
      commit(
        SET_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: newData,
        },
        { root: true }
      );
    },

    async newOrder({ commit }, order) {
      const data = await this.$api.orders.post(order);
      commit(
        ADD_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: data,
        },
        { root: true }
      );
    },

    async deleteOrder({ commit }, order) {
      await this.$api.orders.delete(order);
      commit(
        DELETE_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          id: order.id,
        },
        { root: true }
      );
    },
  },
};
