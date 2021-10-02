<template>
  <main class="content">
    <form action="#" method="post">
      <AppDrop class="content__wrapper" @drop="moveIngridient">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <BuilderDoughSelector @change="changeDoughMethod" />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector @change="changeSize" />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            @input="changeCounter"
            @change="changeSouces"
            @drop="moveIngridient($event)"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView @click="orderPizza" />
        </div>
      </AppDrop>
    </form>
    <router-view />
  </main>
</template>

<script>
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

import { mapState, /*mapGetters,*/ mapActions, mapMutations } from "vuex";
import {
  CHANGE_DOUGH,
  CHANGE_SIZE,
  CHANGE_SOUCE,
  SWITCH_CLASS_PIZZA,
} from "@/store/mutation-types";

export default {
  name: "IndexHome",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    AppDrop,
  },
  computed: {
    ...mapState("Builder", ["composition"]),
    // ...mapGetters("Builder", ["Builder/COMPOSITION"]),

    // classPizza() {
    //   return this.$store.getters["Builder/COMPOSITION"].classPizza;
    // },
  },
  created: function () {
    this.updatePizza();
    this.composition.pizzaFilling = [];
    this.composition.ingr.forEach((item) => {
      item.count = 0;
    });
  },
  methods: {
    ...mapActions("Builder", ["post", "changeDough", "delete"]),
    ...mapMutations("Builder", {
      updateDough: CHANGE_DOUGH,
      updateSize: CHANGE_SIZE,
      updateSouce: CHANGE_SOUCE,
      updateClassPizza: SWITCH_CLASS_PIZZA,
    }),

    switchClassPizza() {
      this.updateClassPizza();
    },
    changeDoughMethod(newDough, newPrice) {
      let payload = {
        value: newDough,
        price: newPrice,
      };
      // this.updateDough(payload);
      this.changeDough(payload);
      this.switchClassPizza();
      // this.updatePizza();
    },
    changeSize(newSize, newMultiplier) {
      let payload = {
        value: newSize,
        multiplier: newMultiplier,
      };
      this.updateSize(payload);
      // this.updatePizza();
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
      let payload = {
        value: newSauce,
        price: newPrice,
      };
      this.updateSouce(payload);
      this.switchClassPizza();
      // this.updatePizza();
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
