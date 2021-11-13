<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="item in sortedSauces(sauces)"
          :key="item.id"
          name="sauce"
          :value="item.value"
          v-model="checkedSouce"
          :classRadioBtn="`radio ingridients__input`"
          @change="changeSouceMethod($event, item.price)"
        >
          <span>{{ item.name }}</span>
        </RadioButton>
      </div>
      <div class="ingridients__filling">
        <p>Начинка:</p>
        <ul class="ingridients__list">
          <li
            v-for="item in ingridients"
            :key="item.id"
            class="ingridients__item"
          >
            <AppDrop @drop="$emit('drop', $event)">
              <AppDrag :transfer-data="item">
                <span class="filling" :class="`filling--${item.label}`">
                  {{ item.name }}
                </span>
              </AppDrag>
            </AppDrop>
            <ItemCounter
              v-model="item.count"
              :parentClass="`ingridients__counter`"
              @input="changeCounterMethod($event, item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";

import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    AppDrag,
    AppDrop,
  },
  computed: {
    ...mapState("Builder", {
      ingridients: (state) => state.ingredients,
      sauces: (state) => state.sauces,
      sauce: (state) => state.composition.sauce.value,
    }),

    checkedSouce: {
      get() {
        return this.sauce;
      },
      set(newSauce) {
        let payload = {
          value: newSauce,
        };
        this.changeSauce(payload);
        this.changeTotalPrice();
        this.switchClassPizza();
      },
    },
  },
  methods: {
    ...mapActions("Builder", [
      "changeSauce",
      "changeCounter",
      "changeTotalPrice",
      "switchClassPizza",
    ]),

    changeCounterMethod(newCount, id) {
      let payload = {
        newCount,
        id,
      };
      this.changeCounter(payload);
      this.changeTotalPrice();
    },
    changeSouceMethod(newSauce, newPrice) {
      let payload = {
        value: newSauce,
        price: newPrice,
      };
      this.changeSauce(payload);
      this.changeTotalPrice();
      this.switchClassPizza();
    },
    sortedSauces(arr) {
      return arr
        .slice()
        .sort((a, b) => b.name - a.name)
        .reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/filling.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
