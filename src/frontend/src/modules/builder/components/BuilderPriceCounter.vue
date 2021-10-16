<template>
  <div class="content__result">
    <p>Итого: {{ TOTAL_PRICE }} ₽</p>
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
      namePizza: "Builder/NAME_PIZZA",
    }),
    ...mapState("Builder", {
      TOTAL_PRICE: (state) => state.composition.totalPrice,
      PIZZA: (state) => state.composition.pizzaFilling,
    }),
    isEmptyNamePizza() {
      return !this.namePizza.trim() || !this.PIZZA.length;
    },
  },
  methods: {
    ...mapActions("Cart", ["createPizza"]),

    createPizzaMethod() {
      this.createPizza();
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
