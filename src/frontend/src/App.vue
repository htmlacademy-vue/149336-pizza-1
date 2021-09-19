<template>
  <div id="app">
    <AppLayout
      :ingredients="ingredients"
      :order="order"
      :isAuth="isAuth"
      @updateIngredients="updateIngredients"
      @addPizzaToCart="addPizzaToCart"
    >
      <router-view
        :ingredients="ingredients"
        :order="order"
        @updateIngredients="updateIngredients"
        @addPizzaToCart="addPizzaToCart"
      />
    </AppLayout>
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
      order: [],
      isAuth: false,
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
    addPizzaToCart(newPizza) {
      this.order.push(newPizza);
      console.log(`addPizzaToCart`);
      console.log(this.order);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
