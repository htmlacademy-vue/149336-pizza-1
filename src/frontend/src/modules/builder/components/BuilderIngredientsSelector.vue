<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>
        <AppRadioButton
          v-for="item in sauces"
          :key="item.id"
          name="sauce"
          :value="item.value"
          v-model="checkedSouce"
          :class-radio-btn="`radio ingridients__input`"
          @change="changeSouceMethod($event, item.price)"
          data-test="sauce"
        >
          <span>{{ item.name }}</span>
        </AppRadioButton>
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
            <AppItemCounter
              v-model="item.count"
              :parentClass="`ingridients__counter`"
              @input="changeCounterMethod($event, item.id)"
              data-test="counter"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppItemCounter from "@/common/components/AppItemCounter";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";

import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppItemCounter,
    AppRadioButton,
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
        this.switchClassPizza();
      },
    },
  },
  methods: {
    ...mapActions("Builder", [
      "changeSauce",
      "changeCounter",
      "switchClassPizza",
    ]),

    changeCounterMethod(newCount, id) {
      let payload = {
        newCount,
        id,
      };
      this.changeCounter(payload);
    },
    changeSouceMethod(newSauce, newPrice) {
      let payload = {
        value: newSauce,
        price: newPrice,
      };
      this.changeSauce(payload);
      this.switchClassPizza();
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
