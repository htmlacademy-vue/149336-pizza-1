<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>
    <div class="diameter sheet__content">
      <RadioButton
        v-for="item in sizes"
        :key="item.id"
        name="diameter"
        :value="item.size"
        v-model="checkedSize"
        :classRadioBtn="`diameter__input diameter__input--${item.size}`"
        :classRadioInput="`visually-hidden`"
      >
        <span> {{ item.name }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", {
      sizes: (state) => state.sizes,
      size: (state) => state.composition.size.value,
    }),

    checkedSize: {
      get() {
        return this.size;
      },
      set(newSize) {
        let payload = {
          value: newSize,
        };
        this.changeSize(payload);
        this.changeTotalPrice();
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["changeSize", "changeTotalPrice"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
