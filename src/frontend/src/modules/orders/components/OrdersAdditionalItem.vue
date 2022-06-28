<template>
  <li>
    <img
      :src="miscItemInfo[0].image"
      width="20"
      height="30"
      :alt="miscItemInfo[0].name"
      data-test="img"
    />
    <p>
      <span data-test="name">{{ miscItemInfo[0].name }}</span>
      <b data-test="sum">{{ miscItemInfo[0].sum }} ₽</b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrdersAdditionalItem",
  props: {
    miscItem: {
      type: Object,
    },
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Cart", ["misc"]),

    miscItemInfo() {
      let m = this.misc
        .filter((misc) => {
          return misc.id === this.miscItem.miscId;
        })
        .map((item) => {
          item = {
            id: item.id,
            image: item.image,
            name: item.name,
            sum: item.price * this.miscItem.quantity,
          };
          return item;
        });
      return m;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/order.scss";
</style>
