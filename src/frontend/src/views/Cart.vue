<template>
  <validation-observer v-slot="{ invalid }" class="wrap">
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
            <cart-form />
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
          <button
            type="submit"
            class="button"
            :disabled="!pizzas.length || invalid"
          >
            Оформить заказ
          </button>
        </div>
      </section>
      <router-view />
    </form>
  </validation-observer>
</template>
<script>
import CartProductItem from "@/modules/cart/components/CartProductItem";
import CartAdditionalItem from "@/modules/cart/components/CartAdditionalItem";
import CartForm from "@/modules/cart/components/CartForm";
import { mapState, mapActions } from "vuex";
import { ValidationObserver, extend, localize } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ru from "vee-validate/dist/locale/ru.json";

localize("ru", ru);
extend("required", required);

export default {
  name: "Cart",
  components: {
    CartProductItem,
    CartAdditionalItem,
    CartForm,
    ValidationObserver,
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
      phone: (state) => state.phone,
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
    // this.query();
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
    ...mapActions("Orders", ["newOrder"]),

    createOrderMethod() {
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
        case "myself":
          myAddress = null;
          break;
        case "new":
          myAddress = {
            id: null,
            name: `ул.${this.address.street}, д.${this.address.house}, кв.${this.address.apartment}`,
            street: this.address.street,
            building: this.address.house,
            flat: this.address.apartment,
            comment: "",
          };
          this.newAddresses(myAddress);
          break;
        default:
          myAddress = {
            id: this.recipient,
            name: `ул.${this.address.street}, д.${this.address.house}, кв.${this.address.apartment}`,
            userId: this.user.id,
            street: this.address.street,
            building: this.address.house,
            flat: this.address.apartment,
            comment: "",
          };
      }
      let order = {
        userId: this.user ? this.user.id : null,
        phone: this.phone || "",
        pizzas: [],
        misc: myMisc,
        address: myAddress,
      };
      this.pizzas
        .filter((pizza) => {
          return pizza.count > 0;
        })
        .forEach((pizza) => {
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
      this.newOrder(order);
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
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";

.wrap {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
