<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select name="test" class="select" v-model="recipientOrder">
        <option value="1">Заберу сам</option>
        <option value="2">Новый адрес</option>
        <option value="3" v-if="USER">Дом</option>
      </select>
    </label>
    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
        type="text"
        name="tel"
        placeholder="+7 999-999-99-99"
        v-model="phoneUser"
      />
    </label>
    <div class="cart-form__address" v-if="recipientOrder !== '1'">
      <span class="cart-form__label">Новый адрес:</span>
      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input type="text" name="street" v-model="streetAddress" />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input type="text" name="house" v-model="houseAddress" />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input type="text" name="apartment" v-model="apartmentAddress" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CartForm",
  components: {},
  data() {
    return {
      recipientOrder: "1",
    };
  },
  computed: {
    ...mapState({
      USER: (state) => state.user,
      ADDRESS: (state) => state.address,
    }),

    phoneUser: {
      get() {
        return this.USER.phone;
      },
      set(newPhone) {
        let payload = {
          value: newPhone,
        };
        this.changeUserPhone(payload);
      },
    },

    ...mapGetters({
      ADDRESS: "Cart/ADDRESS",
    }),

    streetAddress: {
      get() {
        return this.ADDRESS.street;
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
        return this.ADDRESS.house;
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
        return this.ADDRESS.apartment;
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
    ...mapActions("Cart", ["updateUserAddress"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
</style>
