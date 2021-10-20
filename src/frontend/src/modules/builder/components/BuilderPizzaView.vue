<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        :value="name_pizza"
        placeholder="Введите название пиццы"
        @input="updatePizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="class_pizza">
        <div class="pizza__wrapper">
          <div
            v-for="item in PIZZA"
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

    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  computed: {
    ...mapState("Builder", {
      class_pizza: (state) => state.composition.classPizza,
      PIZZA: (state) => state.composition.pizzaFilling,
      name_pizza: (state) => state.composition.namePizza,
    }),
  },
  methods: {
    ...mapActions("Builder", ["changeNamePizza"]),

    updatePizzaName(value) {
      this.changeNamePizza(value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
