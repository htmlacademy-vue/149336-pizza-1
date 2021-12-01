<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select name="test" class="select" v-model="recipientOrder">
        <option value="myself">Заберу сам</option>
        <option value="new" v-if="user">Новый адрес</option>
        <option
          v-for="(address, index) in addresses"
          :key="address.id"
          :value="address.id"
        >
          {{ address.comment || `Адрес ${index + 1}` }}
        </option>
      </select>
    </label>
    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <AppInput
        :value="phone"
        type="tel"
        name="tel"
        class="input"
        placeholder="+7 999-999-99-99"
      />
    </label>
    <div class="cart-form__address" v-if="recipientOrder !== 'myself'">
      <span class="cart-form__label" v-if="recipientOrder == 'new'"
        >Новый адрес:</span
      >
      <span
        class="cart-form__label"
        v-if="recipientOrder !== 'myself' && recipientOrder !== 'new'"
        >Ранее сохраненный адрес:</span
      >
      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <AppInput
            type="text"
            name="street"
            class="input"
            placeholder=""
            v-model="streetAddress"
            :disabled="savedAddress"
          />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <AppInput
            type="text"
            name="house"
            class="input"
            placeholder=""
            v-model="houseAddress"
            :disabled="savedAddress"
          />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <AppInput
            type="text"
            name="apartment"
            class=""
            placeholder=""
            v-model="apartmentAddress"
            :disabled="savedAddress"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CartForm",
  components: {
    AppInput,
  },
  props: {
    phone: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
      addresses: (state) => state.addresses,
    }),
    ...mapState("Cart", {
      recipient: (state) => state.recipient,
    }),

    phoneUser() {
      return this.user.phone;
    },

    ...mapGetters({
      address: "Cart/address",
    }),

    recipientOrder: {
      get() {
        return this.recipient;
      },
      set(newRecipient) {
        let payload = {
          recipient: newRecipient,
        };
        this.updateUserRecipient(payload);
        if (newRecipient === "new") {
          this.resetUserAddress();
        }
        if (newRecipient !== "myself" && newRecipient !== "new") {
          let address = this.addresses.filter((address) => {
            return address.id == newRecipient;
          });
          let newPayload2 = {
            street: address[0].street,
            house: address[0].building,
            apartment: address[0].flat,
          };
          this.updateUserAddress(newPayload2);
        }
      },
    },

    savedAddress() {
      let boolVal =
        this.recipientOrder === "myself"
          ? false
          : this.recipientOrder === "new"
          ? false
          : true;
      return boolVal;
    },

    streetAddress: {
      get() {
        return this.address.street;
      },
      set(newStreet) {
        let payload = {
          street: newStreet,
        };
        this.updateUserAddress(payload);
      },
    },

    houseAddress: {
      get() {
        return this.address.house;
      },
      set(newHouse) {
        let payload = {
          house: newHouse,
        };
        this.updateUserAddress(payload);
      },
    },

    apartmentAddress: {
      get() {
        return this.address.apartment;
      },
      set(newApartment) {
        let payload = {
          apartment: newApartment,
        };
        this.updateUserAddress(payload);
      },
    },
  },
  methods: {
    ...mapActions("Auth", ["changeUserPhone"]),
    ...mapActions("Cart", [
      "updateUserAddress",
      "updateUserRecipient",
      "resetUserAddress",
    ]),
  },

  mounted() {
    // this.$refs.phone.$refs.input.focus();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/cart-form.scss";

.select {
  max-width: 150px;
}
</style>
