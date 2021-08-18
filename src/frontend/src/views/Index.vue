<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
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
            @changeRadioBtn="changeSouces"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView :total="composition.totalPrice" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";

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

export default {
  name: "IndexHome",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      miscs,
      dough: pizzas.dough.map((item) => normalizeDough(item)),
      sizes: pizzas.sizes.map((item) => normalizeSizes(item)),
      sauces: pizzas.sauces.map((item) => normalizeSauces(item)),
      ingredients: pizzas.ingredients.map((item) => normalizeIngredients(item)),
      pizzas,
      users,
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
        ingr: pizzas.ingredients.map((item) => normalizeIngredients(item)),
        totalPrice: 0,
      },
    };
  },
  methods: {
    changeDough(newDough, newPrice) {
      this.composition.dough.value = newDough;
      this.composition.dough.price = newPrice;
      this.updatePizza();
    },
    changeSize(newSize, newMultiplier) {
      this.composition.size.value = newSize;
      this.composition.size.multiplier = newMultiplier;
      this.updatePizza();
    },
    changeCounter(newCount, id) {
      console.log(`changeCounter${id}`);
      this.composition.ingr.filter((item, index) => {
        if (item.id == id) {
          this.composition.ingr[index].count = +newCount;
          console.log(`count = ${this.composition.ingr[index].count}`);
          return index;
        }
      });
      this.updatePizza();
    },
    changeSouces(newSauce, newPrice) {
      this.composition.sauce.value = newSauce;
      this.composition.sauce.price = newPrice;
      this.updatePizza();
    },
    updatePizza() {
      let newArr = [];
      console.log(this.composition.ingr);
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
  },
  created: function () {
    this.updatePizza();
  },
};
</script>

<style lang="scss" scoped></style>
