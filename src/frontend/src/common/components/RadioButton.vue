<template>
  <label :class="classRadioBtn">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :class="classRadioInput"
      @change="$emit('change', $event.target.value)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {},
    classRadioBtn: {
      type: String,
      required: false,
    },
    classRadioInput: {
      type: String,
      required: false,
    },
    name: {},
    value: {},
  },
  computed: {
    isChecked() {
      return this.checked == this.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
