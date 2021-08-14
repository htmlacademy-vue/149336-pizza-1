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
          class="visually-hidden"
          :checked="item.isChecked"
          @change="changeDoughBtn($event, item.price)"
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
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeDoughBtn(event, price) {
      this.$emit("changeDoughBtn", event.target.value, price);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
