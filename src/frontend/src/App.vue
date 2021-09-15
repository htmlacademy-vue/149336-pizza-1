<template>
  <div id="app">
    <AppLayout
      :ingredients="ingredients"
      @updateIngredients="updateIngredients"
    />
  </div>
</template>

<script>
import pizzas from "@/static/pizza.json";

import { normalizeIngredients } from "@/common/helpers";

import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      ingredients: pizzas.ingredients.map((item) => normalizeIngredients(item)),
    };
  },
  methods: {
    updateIngredients(ingredientsToUpdate) {
      ingredientsToUpdate.forEach((ingredient) => {
        const index = this.ingredients.findIndex(
          ({ id }) => id === ingredient.id
        );
        if (~index) {
          this.ingredients.splice(index, 1, ingredient);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
