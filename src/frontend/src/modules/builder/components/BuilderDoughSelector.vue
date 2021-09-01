<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="item in dough"
        :key="item.id"
        :data="item"
        :name="`dough`"
        v-model="item.type"
        :checkedInp="checkedDough"
        :classRadioBtn="`dough__input dough__input--${item.type}`"
        :classRadioInput="`visually-hidden`"
        @change="$emit('change', $event, item.price)"
      >
        <b>{{ item.name }}</b>
        <span>{{ item.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  data() {
    return {
      checkedDough: "light",
    };
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
