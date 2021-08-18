<template>
  <div class="">
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
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter
      :totalPrice="total"
      :isEmptyNamePizza="!pizzaName.trim()"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  props: {
    total: {},
  },
  data() {
    return {
      pizzaName: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
