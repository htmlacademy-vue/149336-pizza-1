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
      @click="$emit('click', $event, pizzaName)"
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
    classPizza: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pizzaName: "",
      pizza: [],
    };
  },
  mounted() {
    //TODO передача между соседними компонентами
    this.$root.$on("changeFilling", (data) => {
      this.pizza = data;
    });
  },
};
</script>

<style lang="scss" scoped></style>
