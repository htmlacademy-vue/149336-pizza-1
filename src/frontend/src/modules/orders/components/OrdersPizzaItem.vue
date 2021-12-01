<template>
  <li>
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ doughSizeText }}</li>
          <li>{{ sauceText }}</li>
          <li>{{ ingridientsText }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price" v-if="pizza.quantity > 1">
      {{ pizza.quantity }} х {{ pizza.totalPricePizza }} ₽
    </p>
    <p class="order__price" v-else>{{ pizza.totalPricePizza }} ₽</p>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrdersPizzaItem",
  components: {},
  props: {
    pizza: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["ingredients"]),

    doughSizeText() {
      let size;
      switch (this.pizza.sizeId) {
        case 1:
          size = 23;
          break;
        case 2:
          size = 45;
          break;
        case 3:
          size = 32;
          break;
      }
      let dough;
      switch (this.pizza.doughId) {
        case 1:
          dough = "тонком";
          break;
        case 2:
          dough = "толстом";
          break;
      }
      return `${size}см, на ${dough} тесте`;
    },

    sauceText() {
      let sauce;
      switch (this.pizza.sauceId) {
        case 1:
          sauce = "томатный";
          break;
        case 2:
          sauce = "сливочный";
          break;
      }
      return `Соус: ${sauce}`;
    },

    ingridientsText() {
      let str = "Начинка: ";
      this.pizza.ingredients.forEach((ingridient) => {
        let id = ingridient.ingredientId;
        let el = this.ingredients.filter((ingr) => {
          return ingr.id === id;
        });
        let name = el[0].name.toLowerCase();
        str += `${name}, `;
      });
      return str.slice(0, -2);
    },
  },
  watch: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/order.scss";
@import "~@/assets/scss/blocks/product.scss";

.order {
  &__price {
    margin-left: 10px;
  }
}
</style>
