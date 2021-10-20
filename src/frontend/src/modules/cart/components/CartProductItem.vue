<template>
  <div class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.title"
      />
      <div class="product__text">
        <h2>{{ pizza.title }}</h2>
        <ul>
          <li>{{ pizza.size }} см, на {{ pizza.dough }} тесте</li>
          <li>Соус: {{ pizza.sauce }}</li>
          <li>Начинка: {{ pizza.fillings }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      v-model="pizza.count"
      :parentClass="`cart-list__counter`"
      :colorBtn="`counter__button--orange`"
      @input="changePriceOrderMethod($event)"
    />

    <div class="cart-list__price">
      <b>{{ pizza.price * pizza.count }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="changePizzaMethod(pizza)"
      >
        Изменить
      </button>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions } from "vuex";

export default {
  name: "CartProductItem",
  components: {
    ItemCounter,
  },
  props: {
    pizza: {
      type: Object,
      required: false,
    },
  },
  methods: {
    ...mapActions("Cart", ["updatePizza", "updateTotalPriceOrder"]),

    changePizzaMethod(pizza) {
      this.updatePizza(pizza);
      this.$router.push({ name: "IndexHome" });
    },

    changePriceOrderMethod() {
      this.updateTotalPriceOrder();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/product.scss";
</style>
