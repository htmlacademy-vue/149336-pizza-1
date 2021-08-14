<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>
    <div class="diameter sheet__content">
      <label
        v-for="item in sizes"
        :key="item.id"
        class="diameter__input"
        :class="`diameter__input--${item.size}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="item.size"
          class="visually-hidden"
          :checked="item.isChecked"
          @change="changeSizeBtn($event, item.multiplier)"
        />
        <span> {{ item.name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeSizeBtn(event, multiplier) {
      this.$emit("changeSizeBtn", event.target.value, multiplier);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
