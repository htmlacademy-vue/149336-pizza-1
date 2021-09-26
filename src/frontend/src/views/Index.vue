<template>
  <main class="content">
    <form action="#" method="post">
      <AppDrop class="content__wrapper" @drop="moveIngridient">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <BuilderDoughSelector
            v-if="dough.length"
            :dough="dough"
            @change="changeDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            v-if="sizes.length"
            :sizes="sizes"
            @change="changeSize"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
            @input="changeCounter"
            @change="changeSouces"
            @drop="moveIngridient($event)"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView
            :total="composition.totalPrice"
            :classPizza="composition.classPizza"
            :pizza="composition.pizzaFilling"
            @click="orderPizza"
          />
        </div>
      </AppDrop>
    </form>
    <router-view />
  </main>
</template>

<script>
// import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
// import users from "@/static/user.json";

import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
} from "@/common/helpers";

import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

import { mapState /*, mapActions, mapMutations*/ } from "vuex";
// import { UPDATE_ENTITY } from "@/store/mutation-types";

export default {
  name: "IndexHome",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    AppDrop,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // miscs,
      dough: pizzas.dough.map((item) => normalizeDough(item)),
      sizes: pizzas.sizes.map((item) => normalizeSizes(item)),
      sauces: pizzas.sauces.map((item) => normalizeSauces(item)),
      // ingredients: pizzas.ingredients.map((item) => normalizeIngredients(item)),
      pizzas,
      // users,
      composition: {
        dough: {
          value: "light",
          price: 300,
        },
        size: {
          value: "normal",
          multiplier: 2,
        },
        sauce: {
          value: "tomato",
          price: 50,
        },
        ingr: this.ingredients.map((item) => normalizeIngredients(item)),
        totalPrice: 0,
        classPizza: "pizza--foundation--small-tomato",
        pizzaFilling: [],
        namePizza: "",
      },
    };
  },
  computed: {
    // dough1() {
    //   return this.$store.getters["Builder/COMPOSITION"];
    // },
    ...mapState("Composition", ["Builder/COMPOSITION"]),
    // ...mapState("Columns", ["columns"]),
    // ...mapState("Tasks", ["filters"]),
  },
  created: function () {
    this.updatePizza();
    console.log(this.composition);
    this.composition.pizzaFilling = [];
    this.composition.ingr.forEach((item) => {
      item.count = 0;
    });
  },
  methods: {
    // ...mapActions("Columns", ["post", "put", "delete"]),
    // ...mapMutations("Tasks", {
    //   updateFilters: UPDATE_ENTITY,
    // }),
    switchClassPizza() {
      let classPizza = "pizza--foundation";
      switch (this.composition.dough.value) {
        case "light":
          classPizza = `${classPizza}--small`;
          break;
        case "large":
          classPizza = `${classPizza}--big`;
          break;
      }
      switch (this.composition.sauce.value) {
        case "tomato":
          classPizza = `${classPizza}-tomato`;
          break;
        case "creamy":
          classPizza = `${classPizza}-creamy`;
          break;
      }
      this.composition.classPizza = classPizza;
    },
    changeDough(newDough, newPrice) {
      this.composition.dough.value = newDough;
      this.composition.dough.price = newPrice;
      this.switchClassPizza();
      this.updatePizza();
    },
    changeSize(newSize, newMultiplier) {
      this.composition.size.value = newSize;
      this.composition.size.multiplier = newMultiplier;
      this.updatePizza();
    },
    changeCounter(newCount, id) {
      this.composition.ingr.filter((item, index) => {
        if (item.id == id) {
          this.composition.ingr[index].count = +newCount;

          let filling = this.composition.ingr
            .filter((item) => {
              return item.count > 0;
            })
            .map((item) => {
              item = {
                id: item.id,
                count: item.count,
                name: item.label,
                title: item.name.toLowerCase(),
              };
              return item;
            });
          this.composition.pizzaFilling = filling;
          return index;
        }
      });
      this.updatePizza();
    },
    changeSouces(newSauce, newPrice) {
      this.composition.sauce.value = newSauce;
      this.composition.sauce.price = newPrice;
      this.switchClassPizza();
      this.updatePizza();
    },
    updatePizza() {
      let newArr = [];
      this.composition.ingr
        .filter((item) => {
          return item.count > 0;
        })
        .forEach((element) => {
          newArr.push(element.count * element.price);
        });
      let multi = newArr.reduce((sum, current) => sum + current, 0);
      // (Основа + Соус + Добавки) * размер
      let newTotalPrice =
        (this.composition.dough.price + this.composition.sauce.price + multi) *
        this.composition.size.multiplier;
      this.composition.totalPrice = newTotalPrice;
    },
    orderPizza(name) {
      this.composition.namePizza = name;
      console.log(this.composition);
      let fillings = "";
      this.composition.pizzaFilling.forEach((item) => {
        fillings += `${item.title}, `;
      });
      console.log(fillings);
      let pizza = {
        title: this.composition.namePizza,
        size:
          this.composition.size.value === "normal"
            ? 32
            : this.composition.size.value === "big"
            ? 45
            : 23,
        dough: this.composition.dough.value === "large" ? "толстом" : "тонком",
        sauce:
          this.composition.sauce.value === "tomato" ? "томатный" : "сливочный",
        fillings: fillings.slice(0, -2),
        price: this.composition.totalPrice,
      };
      this.$emit("addPizzaToCart", pizza);
      this.$router.push({ name: "Cart" });
    },
    moveIngridient(active) {
      if (active.count > 2) {
        return;
      }
      this.changeCounter(active.count + 1, active.id);
      let ingredientsToUpdate = this.composition.ingr;
      this.$emit("updateIngredients", ingredientsToUpdate);
    },
  },
};
</script>

<style lang="scss" scoped></style>
