<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select name="test" class="select" v-model="recipientOrder">
        <option value="myself">Заберу сам</option>
        <option value="new">Новый адрес</option>
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
      <validation-provider
        v-if="recipientOrder === 'myself'"
        name="Phone"
        rules="required"
        v-slot="{ errors }"
      >
        <AppInput
          v-model="phoneUser"
          type="tel"
          name="tel"
          class="input"
          placeholder="+7 999-999-99-99"
          :errorText="errors[0]"
        />
      </validation-provider>
      <AppInput
        v-else
        v-model="phoneUser"
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
          <validation-provider
            v-if="recipientOrder === 'new'"
            name="Street"
            rules="required"
            v-slot="{ errors }"
          >
            <AppInput
              type="text"
              name="street"
              class="input"
              placeholder="ул.Ленина"
              v-model="streetAddress"
              :errorText="errors[0]"
            />
          </validation-provider>
          <AppInput
            v-else
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
          <validation-provider
            v-if="recipientOrder === 'new'"
            name="House"
            rules="required"
            v-slot="{ errors }"
          >
            <AppInput
              type="text"
              name="house"
              class="input"
              placeholder="100"
              v-model="houseAddress"
              :errorText="errors[0]"
            />
          </validation-provider>
          <AppInput
            v-else
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
import { ValidationProvider, extend, localize } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ru from "vee-validate/dist/locale/ru.json";

localize("ru", ru);
extend("required", required);

export default {
  name: "CartForm",
  components: {
    AppInput,
    ValidationProvider,
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
      addresses: (state) => state.addresses,
    }),
    ...mapState("Cart", {
      recipient: (state) => state.recipient,
      phone: (state) => state.phone,
    }),

    phoneUser: {
      get() {
        return this.phone;
      },
      set(newPhone) {
        let payload = {
          phone: newPhone,
        };
        this.updatePhone(payload);
      },
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
      "updatePhone",
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
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/select.scss";

.select {
  max-width: 150px;
}
.input--big-label {
  max-width: 397px;
}
.input--big-label .input {
  max-width: 216px;
}
</style>
