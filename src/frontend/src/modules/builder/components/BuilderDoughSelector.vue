<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="item in DOUGHS"
        :key="item.id"
        :name="`dough`"
        :value="item.type"
        v-model="checkedDough"
        :classRadioBtn="`dough__input dough__input--${item.type}`"
        :classRadioInput="`visually-hidden`"
      >
        <b>{{ item.name }}</b>
        <span>{{ item.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapState, mapActions, mapMutations } from "vuex";
import { CHANGE_DOUGH, SWITCH_CLASS_PIZZA } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  // data() {
  //   return {
  //     checkedDough: "light",
  //   };
  // },
  computed: {
    ...mapState("Builder", {
      DOUGHS: (state) => state.doughs,
      DOUGH: (state) => state.composition.dough.value,
    }),

    checkedDough: {
      get() {
        return this.DOUGH;
      },
      set(newDough) {
        let payload = {
          value: newDough,
          // price: newPrice,
        };
        this.changeDough(payload);
        this.changeTotalPrice();
        this.switchClassPizza();
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["changeDough", "changeTotalPrice"]),
    ...mapMutations("Builder", {
      updateDough: CHANGE_DOUGH,
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
      this.changeTotalPrice();
      this.switchClassPizza();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
