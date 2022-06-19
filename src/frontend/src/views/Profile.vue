<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="
            require(`@/assets/img/users/user5@2x.webp`) +
            ' 1x, ' +
            require(`@/assets/img/users/user5@4x.webp`) +
            ' 2x'
          "
        />
        <img
          :src="require(`@/assets/img/users/user5@2x.jpg`)"
          :srcset="require(`@/assets/img/users/user5@4x.jpg`) + ' 4x'"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address" v-if="addresses">
      <profile-address-view
        class="layout__address"
        v-for="address in addresses"
        :key="address.id"
        :address="address"
        @putAddress="putAddress(address)"
      />
    </div>

    <div class="layout__address" v-if="visibleForm">
      <profile-address-edit
        :adr="editableAddress"
        @resetAddress="resetAddress"
        @changeVisibleForm="changeVisibleForm"
      />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="visibleForm = !visibleForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProfileAddressEdit from "../modules/profile/components/ProfileAddressEdit.vue";
import ProfileAddressView from "../modules/profile/components/ProfileAddressView.vue";

export default {
  name: "Profile",
  components: {
    ProfileAddressView,
    ProfileAddressEdit,
  },
  props: [],
  data() {
    return {
      visibleForm: false,
      editableAddress: {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
      addresses: (state) => state.addresses,
    }),
  },
  watch: {},
  created() {
    this.queryAddresses();
  },
  methods: {
    ...mapActions("Auth", ["queryAddresses"]),

    changeVisibleForm() {
      this.visibleForm = !this.visibleForm;
    },

    putAddress(address) {
      this.editableAddress = address;
      this.changeVisibleForm();
    },

    resetAddress() {
      this.editableAddress = {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/user.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/layout/layout.scss";

.layout__content {
  .layout__content {
    padding: 0;
  }
}
</style>
