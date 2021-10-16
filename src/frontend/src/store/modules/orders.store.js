// import { uniqueId } from "lodash";
import {
  // SET_ENTITY,
  // DELETE_ENTITY,
  CREATE_ORDER,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    ORDERS: (state) => {
      return state.orders;
    },
  },
  mutations: {
    [CREATE_ORDER]: (state, payload) => {
      // const data = cloneDeep(payload.rootData.Builder.composition);
      // let order = {
      //   userId: payload.rootData.user.id || null,
      //   pizzas: [
      //     {
      //       name: payload.rootData.Builder.composition.namePizza,
      //       sauceId: payload.rootData.Builder.composition.sauce.id,
      //       doughId: payload.rootData.Builder.composition.dough.id,
      //       sizeId: payload.rootData.Builder.composition.size.id,
      //       quantity: 0,
      //       ingredients: [
      //         {
      //           ingredientId: 0,
      //           quantity: 0,
      //         },
      //       ],
      //     },
      //   ],
      //   misc: [
      //     {
      //       miscId: 0,
      //       quantity: 0,
      //     },
      //   ],
      //   address: {
      //     name: payload.data.address.name,
      //     street: payload.data.address.street,
      //     building: payload.data.address.building,
      //     flat: payload.data.address.flat,
      //     comment: payload.data.address.comment,
      //   },
      // };
      console.log(payload.data);
      state.orders.push(payload.data);
    },
  },
  actions: {
    createOrder({ commit, rootState }, data) {
      commit(
        CREATE_ORDER,
        {
          data,
          rootData: rootState,
        },
        { root: false }
      );
    },
  },
};
