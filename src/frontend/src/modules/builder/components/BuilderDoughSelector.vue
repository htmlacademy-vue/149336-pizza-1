<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <label
        v-for="item in dough"
        :key="item.id"
        class="dough__input"
        :class="`dough__input--${item.type}`"
      >
        <input
          type="radio"
          name="dought"
          :value="item.type"
          v-model="checkedDough"
          class="visually-hidden"
          @change="$emit('change', $event.target.value, item.price)"
        />
        <b>{{ item.name }}</b>
        <span>{{ item.description }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  data() {
    return {
      checkedDough: "light",
    };
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
