<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        :value="namePizza"
        placeholder="Введите название пиццы"
        @input="updatePizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="classPizza">
        <transition-group class="pizza__wrapper" name="filling" tag="div">
          <div
            v-for="item in pizzaFilling"
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
        </transition-group>
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
      classPizza: (state) => state.composition.classPizza,
      pizzaFilling: (state) => state.composition.pizzaFilling,
      namePizza: (state) => state.composition.namePizza,
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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/pizza.scss";

/*Transitions*/
.filling-enter-active,
.filling-leave-active {
  transition: all $animationSpeed ease;
}

.filling-enter,
.filling-leave-to {
  transform: scale(1.1);

  opacity: 0;
}
</style>
