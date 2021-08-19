<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="value <= 0"
      @click="validateCount($event)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @keydown="validateCount($event)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value >= 3"
      @click="validateCount($event)"
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
    validateCount(event) {
      console.log(event);
      let el = event.target;
      let tag = el.tagName;
      let key = event.key;
      let classes = el.className;
      if (tag === "INPUT") {
        console.log(`count(ItemCounter) = ${key}`);
        if (!/[0-3]/.test(key)) {
          event.preventDefault();
        } else {
          this.$emit("input", +key);
        }
      } else if (tag === "BUTTON") {
        if (classes.includes("counter__button--minus")) {
          let val = +el.nextSibling.value;
          this.$emit("input", val - 1);
        } else if (classes.includes("counter__button--plus")) {
          let val = +el.previousSibling.value;
          this.$emit("input", val + 1);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
</style>
