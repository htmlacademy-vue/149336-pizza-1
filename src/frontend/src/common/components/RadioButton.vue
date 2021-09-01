<template>
  <label :class="classRadioBtn">
    <input
      type="radio"
      :name="name"
      :value="
        name === `sauce`
          ? data.value
          : name === `diameter`
          ? data.size
          : data.type
      "
      :checked="checkedInp"
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
    data: {
      type: Object,
      required: true,
    },
    checkedInp: {
      type: String,
      required: true,
    },
    name: {},
  },
};
</script>

<style lang="scss" scoped></style>
