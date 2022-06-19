<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="item in doughs"
        :key="item.id"
        name="dough"
        :value="item.type"
        v-model="checkedDough"
        :classRadioBtn="`dough__input dough__input--${item.type}`"
        :classRadioInput="`visually-hidden`"
        data-test="radio"
      >
        <b data-test="name">{{ item.name }}</b>
        <span data-test="description">{{ item.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", {
      doughs: (state) => state.doughs,
      dough: (state) => state.composition.dough.value,
    }),

    checkedDough: {
      get() {
        return this.dough;
      },
      set(newDough) {
        let payload = {
          value: newDough,
        };
        this.changeDough(payload);
        this.switchClassPizza();
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["changeDough", "switchClassPizza"]),

    changeDoughMethod(newDough, newPrice) {
      let payload = {
        value: newDough,
        price: newPrice,
      };
      this.changeDough(payload);
      this.switchClassPizza();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
