<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="counterInput <= 0"
      @click="counterInput--"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      value="0"
      @input="changeCounterValue($event, data.id, data.price)"
      v-model="counterInput"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="counterInput >= 3"
      @click="counterInput++"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      counterInput: 0,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeCounterValue(event, id, price) {
      this.$parent.$emit("changeCounterValue", this.counterInput, id, price);
    },
  },
  watch: {
    counterInput: function () {
      this.changeCounterValue();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
</style>
