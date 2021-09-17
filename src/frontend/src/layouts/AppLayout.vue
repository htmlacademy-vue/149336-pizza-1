<template>
  <component
    :is="layout"
    :ingredients="layoutIngredients"
    :order="layoutOrders"
    :auth="auth"
    @updateIngredients="$emit('updateIngredients', $event)"
    @addPizzaToCart="$emit('addPizzaToCart', $event)"
  >
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    order: {
      type: Array,
      required: false,
    },
    auth: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },

    layoutIngredients() {
      return this.$route.meta.layout !== defaultLayout
        ? this.ingredients
        : null;
    },

    layoutOrders() {
      return this.$route.meta.layout !== defaultLayout ? this.order : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
