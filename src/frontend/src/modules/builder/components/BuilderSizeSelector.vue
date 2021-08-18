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
          v-model="checkedSize"
          class="visually-hidden"
          :checked="item.isChecked"
          @change="$emit('change', $event.target.value, item.multiplier)"
        />
        <span> {{ item.name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/diameter.scss";
</style>
