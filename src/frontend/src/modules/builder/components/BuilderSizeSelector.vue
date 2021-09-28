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
import { mapState, mapGetters } from "vuex";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      checkedSize: "normal",
    };
  },
  computed: {
    ...mapState("Builder", ["composition"]),
    ...mapGetters("Builder", ["Builder/SIZES"]),

    sizes() {
      return this.$store.getters["Builder/SIZES"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
