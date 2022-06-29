<template>
  <div class="content__result">
    <p data-test="price">Итого: {{ getTotalPrice || 0 }} ₽</p>
    <button
      v-if="!composition.id"
      key="go"
      type="button"
      class="button"
      :class="{ 'button--disabled': isEmptyNamePizza }"
      :disabled="isEmptyNamePizza"
      @click="createPizzaMethod"
      data-test="create"
    >
      Готовьте!
    </button>
    <button
      v-else
      key="go"
      type="button"
      class="button"
      :class="{ 'button--disabled': isEmptyNamePizza }"
      :disabled="isEmptyNamePizza"
      @click="editPizzaMethod"
      data-test="edit"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Auth", {
      isAuthenticated: (state) => state.isAuthenticated,
    }),

    ...mapState("Builder", {
      composition: (state) => state.composition,
      namePizza: (state) => state.composition.namePizza,
      pizzaFilling: (state) => state.composition.pizzaFilling,
    }),

    ...mapGetters({
      getTotalPrice: "Builder/getTotalPrice",
    }),

    isEmptyNamePizza() {
      return !this.namePizza.trim() || !this.pizzaFilling.length;
    },
  },
  methods: {
    ...mapActions("Cart", ["createPizza", "editPizza"]),

    createPizzaMethod() {
      this.createPizza();
      this.$router.push({ name: "Cart" });
    },

    editPizzaMethod() {
      this.editPizza();
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/blocks/button.scss";
</style>
