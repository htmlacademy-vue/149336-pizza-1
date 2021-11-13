<template>
  <form class="layout-form" @submit.prevent="createOrderMethod">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="!pizzas.length">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-if="pizzas.length">
          <li
            is="cart-product-item"
            v-for="(item, index) in pizzas"
            :key="index"
            :pizza="item"
          ></li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list" v-if="pizzas.length & misc.length">
            <li
              is="cart-additional-item"
              v-for="(item, index) in misc"
              :key="index"
              :item="item"
            ></li>
          </ul>
        </div>
        <div class="cart__form" v-if="pizzas.length">
          <cart-form v-model="phone" :validations="validations" />
        </div>
      </div>
    </main>
    <section class="footer" v-if="pizzas.length">
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
        <button type="submit" class="button" :disabled="!pizzas.length">
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
import { validator } from "@/common/mixins";
import { mapState, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    CartProductItem,
    CartAdditionalItem,
    CartForm,
  },
  mixins: [validator],
  data: () => ({
    // email: "",
    // password: "",
    phone: "",
    validations: {
      // email: {
      //   error: "",
      //   rules: ["required", "email"],
      // },
      // password: {
      //   error: "",
      //   rules: ["required"],
      // },
      phone: {
        error: "",
        rules: ["phone"],
      },
    },
  }),
  watch: {
    // email() {
    //   this.$clearValidationErrors();
    // },
    // password() {
    //   this.$clearValidationErrors();
    // },
    phone() {
      this.$clearValidationErrors();
    },
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
    }),
    ...mapState("Builder", {
      composition: (state) => state.composition,
    }),
    ...mapState("Cart", {
      pizzas: (state) => state.pizzas,
      misc: (state) => state.misc,
      address: (state) => state.address,
      recipient: (state) => state.recipient,
    }),

    totalPriceOrder() {
      let pizzasPrice = 0,
        miscsPrice = 0;
      this.pizzas
        .filter((pizza) => {
          return pizza.count > 0;
        })
        .forEach((pizza) => {
          pizzasPrice += pizza.count * pizza.price;
        });
      this.misc
        .filter((misc) => {
          return misc.count > 0;
        })
        .forEach((misc) => {
          miscsPrice += misc.count * misc.price;
        });
      this.updateTotalPriceOrder();
      return pizzasPrice + miscsPrice;
    },
  },
  created: function () {
    this.query();
  },
  methods: {
    ...mapActions("Builder", ["resetBuilder"]),
    ...mapActions("Cart", [
      "query",
      "createPizza",
      "updatePizza",
      "updateTotalPriceOrder",
    ]),

    ...mapActions("Auth", ["newAddresses"]),
    ...mapActions("Orders", ["createOrder"]),

    createOrderMethod() {
      if (!this.$validateFields({ phone: this.phone }, this.validations)) {
        return;
      }
      let myIngr = [];
      this.composition.ingr
        .filter((ingr) => {
          return ingr.count > 0;
        })
        .forEach((item) => {
          myIngr.push({ ingredientId: item.id, quantity: item.count });
        });
      let myMisc = [];
      this.misc
        .filter((misc) => {
          return misc.count > 0;
        })
        .forEach((item) =>
          myMisc.push({ miscId: item.id, quantity: item.count })
        );
      let myAddress;
      switch (this.recipient) {
        case "1":
          myAddress = null;
          break;
        case "3":
          myAddress = { id: 111 };
          break;
        default:
          myAddress = {
            name: this.user.name,
            userId: this.user.id,
            street: this.address.street,
            building: this.address.house,
            flat: this.address.apartment,
            comment: "",
          };
          this.newAddresses(myAddress);
      }
      console.log(`myAddress = `);
      console.log(myAddress);
      let order = {
        userId: this.user.id || null,
        pizzas: [],
        misc: myMisc,
        address: myAddress,
      };

      this.pizzas.forEach((pizza) => {
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
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/additional-list.scss";
@import "~@/assets/scss/blocks/footer.scss";
</style>
