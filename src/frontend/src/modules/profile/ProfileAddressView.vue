<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b v-if="address.name">{{ address.name }}</b>
      <b v-else>Адрес №{{ address.id }}.</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="putAddress" title="Изменить">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>
      {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
    </p>
    <small v-if="address.comment">{{ address.comment }}</small>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  name: "ProfileAddressView",
  components: {},
  props: {
    address: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    putAddress() {
      this.$emit("putAddress");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.icon {
  cursor: pointer;
}
</style>
