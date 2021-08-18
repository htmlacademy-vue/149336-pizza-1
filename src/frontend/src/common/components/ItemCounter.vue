<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="value <= 0"
      @click="$emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @keydown="validateCount($event, id)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value >= 3"
      @click="$emit('input', value + 1)"
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
    id: {},
  },
  methods: {
    validateCount(event, id) {
      if (!/[0-3]/.test(event.key)) {
        event.preventDefault();
        console.log(`!`);
      } else {
        this.$emit("input", event.target.value, id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
</style>
