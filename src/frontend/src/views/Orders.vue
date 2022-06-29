<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section
      is="OrdersItem"
      class="sheet order"
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import OrdersItem from "../modules/orders/components/OrdersItem.vue";

export default {
  name: "Orders",
  components: { OrdersItem },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  created() {
    this.queryOrders();
  },
  methods: {
    ...mapActions("Orders", ["queryOrders", "newOrder", "deleteOrder"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/order.scss";
@import "~@/assets/scss/blocks/title.scss";

.layout__content {
  .layout__content {
    padding: 0;
  }
}
</style>
