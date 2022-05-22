<template>
  <div class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        v-model="item.count"
        :parentClass="`additional-list__counter`"
        :colorBtn="`counter__button--orange`"
      />

      <div class="additional-list__price">
        <b data-test="price">{{ item.price }} ₽</b>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditionalItem",
  components: {
    ItemCounter,
  },
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/counter.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/additional-list.scss";
</style>
