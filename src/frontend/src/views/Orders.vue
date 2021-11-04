<template>
  <h1>Orders</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Orders",
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  watch: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/order.scss";
</style>
