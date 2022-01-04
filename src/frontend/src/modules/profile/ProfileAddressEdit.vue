<template>
  <validation-observer v-slot="{ invalid }">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="updateAddress"
    >
      <div class="address-form__header">
        <b v-if="addrId">Адрес №{{ addrId }}</b>
        <b v-else>Адрес №</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <validation-provider
              name="Название"
              rules="required"
              v-slot="{ errors }"
            >
              <AppInput
                v-model="addrName"
                type="text"
                name="addr-name"
                class="input"
                placeholder="Введите название адреса"
                :errorText="errors[0]"
              />
            </validation-provider>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <validation-provider
              name="Улица"
              rules="required"
              v-slot="{ errors }"
            >
              <AppInput
                v-model="addrStreet"
                type="text"
                name="addr-street"
                class="input"
                placeholder="Введите название улицы"
                :errorText="errors[0]"
              />
            </validation-provider>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <validation-provider
              name="Дом"
              rules="required|alpha_num"
              v-slot="{ errors }"
            >
              <AppInput
                v-model="addrHouse"
                type="text"
                name="addr-house"
                class="input"
                placeholder="Введите номер дома"
                :errorText="errors[0]"
              />
            </validation-provider>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <validation-provider
              name="Квартира"
              rules="numeric"
              v-slot="{ errors }"
            >
              <AppInput
                v-model="addrApartment"
                type="text"
                name="addr-apartment"
                class="input"
                placeholder="Введите № квартиры"
                :errorText="errors[0]"
              />
            </validation-provider>
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <AppInput
              v-model="addrComment"
              type="text"
              name="addr-comment"
              class=""
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="delAddress"
          v-if="addrId"
        >
          Удалить
        </button>
        <button
          type="button"
          class="button button--transparent"
          @click="$emit('changeVisibleForm')"
          v-else
        >
          Отменить
        </button>
        <button type="submit" class="button" :disabled="invalid">
          Сохранить
        </button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppInput from "@/common/components/AppInput";

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import { required, alpha_num, numeric } from "vee-validate/dist/rules";
import ru from "vee-validate/dist/locale/ru.json";

localize("ru", ru);

extend("required", required);
extend("alpha_num", alpha_num);
extend("numeric", numeric);

export default {
  name: "ProfileAddressEdit",
  components: {
    AppInput,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    adr: {
      type: Object,
      require: false,
    },
  },
  data: () => ({
    addrId: null,
    addrName: "",
    addrStreet: "",
    addrHouse: "",
    addrApartment: "",
    addrComment: "",
  }),
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
      addresses: (state) => state.addresses,
    }),
  },
  watch: {},
  created() {
    if (this.adr) {
      this.addrId = this.adr.id;
      this.addrName = this.adr.name;
      this.addrStreet = this.adr.street;
      this.addrHouse = this.adr.building;
      this.addrApartment = this.adr.flat;
      this.addrComment = this.adr.comment;
    }
  },
  methods: {
    ...mapActions("Auth", ["newAddresses", "deleteAddress", "updateAddresses"]),

    updateAddress(event) {
      let address = {
        name: this.addrName || "",
        userId: this.user.id || "",
        street: this.addrStreet || "",
        building: this.addrHouse || "",
        flat: this.addrApartment || "",
        comment: this.addrComment || "",
      };
      if (this.addrId) {
        address.id = this.addrId;
        this.updateAddresses(address);
      } else {
        this.newAddresses(address);
      }
      event.target.reset();
      this.$emit("resetAddress");
      this.$emit("changeVisibleForm");
    },

    delAddress() {
      let address = {
        id: this.addrId,
        name: this.addrName,
        userId: this.user.id,
        street: this.addrStreet,
        building: this.addrHouse,
        flat: this.addrApartment,
        comment: this.addrComment,
      };
      this.deleteAddress(address);
      this.$emit("resetAddress");
      this.$emit("changeVisibleForm");
    },
  },
  beforeDestroy() {
    // event.target.reset();
    // alert("beforeDestroy");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
</style>
