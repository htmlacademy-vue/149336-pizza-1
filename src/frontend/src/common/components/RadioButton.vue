<template>
  <label class="radio" :class="classRadioBtn">
    <input
      type="radio"
      name="sauce"
      :value="data.value"
      :checked="data.isChecked"
      @change="changeRadioBtn($event, data.price)"
    />
    <span>{{ data.name }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    classRadioBtn: {
      type: String,
      required: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeRadioBtn(event, price) {
      this.$parent.$emit("changeRadioBtn", event.target.value, price);
    },
  },
};
</script>

<style lang="scss" scoped></style>
