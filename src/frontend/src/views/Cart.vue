<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="!PIZZAS.length">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-if="PIZZAS.length">
          <li
            is="cart-product-item"
            v-for="(item, index) in PIZZAS"
            :key="index"
            :pizza="item"
          ></li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list" v-if="PIZZAS.length & MISC.length">
            <li
              is="cart-additional-item"
              v-for="(item, index) in MISC"
              :key="index"
              :item="item"
            ></li>
          </ul>
        </div>
        <div class="cart__form" v-if="PIZZAS.length">
          <cart-form />
        </div>
      </div>
    </main>
    <section class="footer" v-if="PIZZAS.length">
      <div class="footer__more">
        <a
          href="#"
          class="button button--border button--arrow"
          @click="oneMorePizza"
        >
          Хочу еще одну
        </a>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPriceOrder }} ₽</b>
      </div>
      <div class="footer__submit">
        <button
          type="button"
          class="button"
          :disabled="!PIZZAS.length"
          @click="createOrderMethod"
        >
          Оформить заказ
        </button>
      </div>
    </section>
    <router-view />
  </form>
</template>

<script>
import CartProductItem from "@/modules/cart/components/CartProductItem";
import CartAdditionalItem from "@/modules/cart/components/CartAdditionalItem";
import CartForm from "@/modules/cart/components/CartForm";
import { mapState, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    CartProductItem,
    CartAdditionalItem,
    CartForm,
  },
  computed: {
    ...mapState({
      USER: (state) => state.user,
    }),
    ...mapState("Builder", {
      COMPOSITION: (state) => state.composition,
    }),
    ...mapState("Cart", {
      PIZZAS: (state) => state.pizzas,
      MISC: (state) => state.misc,
      ADDRESS: (state) => state.address,
    }),

    totalPriceOrder() {
      let pizzasPrice = 0,
        miscsPrice = 0;
      this.PIZZAS.filter((pizza) => {
        return pizza.count > 0;
      }).forEach((pizza) => {
        pizzasPrice += pizza.count * pizza.price;
      });
      this.MISC.filter((misc) => {
        return misc.count > 0;
      }).forEach((misc) => {
        miscsPrice += misc.count * misc.price;
      });
      this.updateTotalPriceOrder();
      return pizzasPrice + miscsPrice;
    },
  },
  methods: {
    ...mapActions("Builder", ["resetBuilder"]),
    ...mapActions("Cart", [
      "createPizza",
      "updatePizza",
      "updateTotalPriceOrder",
    ]),
    ...mapActions("Orders", ["createOrder"]),

    createOrderMethod() {
      let myIngr = [];
      this.COMPOSITION.ingr
        .filter((ingr) => {
          return ingr.count > 0;
        })
        .forEach((item) => {
          myIngr.push({ ingredientId: item.id, quantity: item.count });
        });
      let myMisc = [];
      this.MISC.filter((misc) => {
        return misc.count > 0;
      }).forEach((item) =>
        myMisc.push({ miscId: item.id, quantity: item.count })
      );

      let order = {
        userId: this.USER.userId || null,
        pizzas: [],
        misc: myMisc,
        address: {
          name: this.USER.name,
          street: this.ADDRESS.street,
          building: this.ADDRESS.house,
          flat: this.ADDRESS.apartment,
          comment: "",
        },
      };

      this.PIZZAS.forEach((pizza) => {
        let newPizza = {
          name: pizza.composition.namePizza,
          sauceId: pizza.composition.sauce.id,
          doughId: pizza.composition.dough.id,
          sizeId: pizza.composition.size.id,
          quantity: pizza.count,
          ingredients: myIngr,
        };
        order.pizzas.push(newPizza);
      });

      order.userId === null ? null : this.createOrder(order);
      this.$router.push({ name: "Popup" });
    },

    oneMorePizza() {
      this.resetBuilder();
      this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/additional-list.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
@import "~@/assets/scss/blocks/footer.scss";
</style>
