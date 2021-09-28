<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        v-model="pizzaName"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="classPizza">
        <div class="pizza__wrapper">
          <div
            v-for="item in pizza"
            :key="item.id"
            class="pizza__filling"
            :class="[
              {
                'pizza__filling--second': item.count === 2,
                'pizza__filling--third': item.count === 3,
              },
              `pizza__filling--${item.name}`,
            ]"
          ></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter
      :totalPrice="total"
      :isEmptyNamePizza="!pizzaName.trim() || !pizza.length"
      @click="$emit('click', pizzaName)"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  data() {
    return {
      pizzaName: "",
    };
  },
  computed: {
    ...mapState("Builder", ["composition"]),
    ...mapGetters("Builder", ["Builder/COMPOSITION", "Builder/PIZZA_FILLING"]),

    classPizza() {
      return this.$store.getters["Builder/COMPOSITION"].classPizza;
    },

    pizza() {
      return this.$store.getters["Builder/PIZZA_FILLING"];
    },

    total() {
      return this.$store.getters["Builder/COMPOSITION"].totalPrice;
    },
  },
};
</script>

<style lang="scss" scoped></style>
