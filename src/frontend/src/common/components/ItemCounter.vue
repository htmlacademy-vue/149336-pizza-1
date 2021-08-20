<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="internalValue <= 0"
      @click="internalValue--"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="internalValue"
      @input="internalValue = $event.target.value"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="internalValue >= 3"
      @click="internalValue++"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {},
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        let tempValue = parseInt(newValue);
        if (newValue === "" || isNaN(tempValue)) {
          tempValue = 0;
        }

        if (tempValue > 3) {
          tempValue = 3;
        }

        this.$emit("input", tempValue);
        this.$forceUpdate();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
</style>
