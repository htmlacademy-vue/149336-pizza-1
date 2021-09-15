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

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  props: {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    classPizza: {
      type: String,
      required: true,
    },
    pizza: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      pizzaName: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
