<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': isEmptyNamePizza }"
      :disabled="isEmptyNamePizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    totalPrice: {},
    isEmptyNamePizza: {},
  },
};
</script>

<style lang="scss" scoped></style>
