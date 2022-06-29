<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>
    <div class="diameter sheet__content">
      <AppRadioButton
        v-for="item in sizes"
        :key="item.id"
        name="diameter"
        :value="item.size"
        v-model="checkedSize"
        :class-radio-btn="`diameter__input diameter__input--${item.size}`"
        :class-radio-input="`visually-hidden`"
        data-test="size"
      >
        <span> {{ item.name }}</span>
      </AppRadioButton>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppRadioButton,
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
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["changeSize"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
