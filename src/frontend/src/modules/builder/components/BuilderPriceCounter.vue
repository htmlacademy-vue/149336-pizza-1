<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': isEmptyNamePizza }"
      :disabled="isEmptyNamePizza"
      @click="createPizzaMethod"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters({
      namePizza: "Builder/namePizza",
      pizzaFilling: "Builder/pizzaFilling",
    }),

    ...mapState("Builder", {
      totalPrice: (state) => state.composition.totalPrice,
    }),

    isEmptyNamePizza() {
      return !this.namePizza.trim() || !this.pizzaFilling.length;
    },
  },
  methods: {
    ...mapActions("Auth", ["queryAddresses"]),
    ...mapActions("Cart", ["query", "createPizza"]),

    createPizzaMethod() {
      this.createPizza();
      // this.query();
      this.queryAddresses();
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
</style>
