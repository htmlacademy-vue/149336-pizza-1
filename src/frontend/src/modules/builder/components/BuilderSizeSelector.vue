<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>
    <div class="diameter sheet__content">
      <RadioButton
        v-for="item in sizes"
        :key="item.id"
        :name="`diameter`"
        :value="item.size"
        v-model="checkedSize"
        :classRadioBtn="`diameter__input diameter__input--${item.size}`"
        :classRadioInput="`visually-hidden`"
        @change="$emit('change', $event, item.multiplier)"
      >
        <span> {{ item.name }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  data() {
    return {
      checkedSize: "normal",
    };
  },
  props: {
    sizes: {
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
@import "~@/assets/scss/blocks/diameter.scss";
</style>
