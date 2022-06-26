<template>
  <li>
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
        data-test="alt"
      />
      <div class="product__text">
        <h2 data-test="name">{{ pizza.name }}</h2>
        <ul>
          <li data-test="doughSizeText">{{ doughSizeText }}</li>
          <li data-test="sauceText">{{ sauceText }}</li>
          <li data-test="ingridientsText">{{ ingridientsText }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price" v-if="pizza.quantity > 1" data-test="quantity">
      {{ pizza.quantity }} х {{ pizza.totalPricePizza }} ₽
    </p>
    <p class="order__price" v-else data-test="price">
      {{ pizza.totalPricePizza }} ₽
    </p>
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
    ...mapState("Builder", ["ingredients", "sauces", "sizes", "doughs"]),

    doughSizeText() {
      let size = this.sizes.filter((s) => {
        return s.id === this.pizza.sizeId;
      })[0].name;

      let dough;
      let typeDough = this.doughs.filter((d) => {
        return d.id === this.pizza.doughId;
      })[0].type;
      switch (typeDough) {
        case "large":
          dough = "толстом";
          break;
        case "light":
          dough = "тонком";
          break;
      }

      return `${size}, на ${dough} тесте`;
    },

    sauceText() {
      let sauce = this.sauces
        .filter((s) => {
          return s.id === this.pizza.sauceId;
        })[0]
        .name.toLowerCase();
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
