<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b v-if="address.name" data-test="name" key="address-name">{{
        address.name
      }}</b>
      <b v-else data-test="alternate" key="address-name"
        >Адрес №{{ address.id }}.</b
      >
      <div class="address-form__edit">
        <button
          type="button"
          class="icon"
          @click="putAddress"
          title="Изменить"
          data-test="put"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p data-test="street">
      {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
    </p>
    <small v-if="address.comment" data-test="comment">
      {{ address.comment }}
    </small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressView",
  props: {
    address: {
      type: Object,
    },
  },
  methods: {
    putAddress() {
      this.$emit("putAddress");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/icon.scss";
@import "~@/assets/scss/blocks/address-form.scss";

.icon {
  cursor: pointer;
}
</style>
