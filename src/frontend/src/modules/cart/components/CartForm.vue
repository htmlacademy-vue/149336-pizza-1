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
          <input type="text" name="street" v-model="street" />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input type="text" name="house" v-model="house" />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input type="text" name="apartment" v-model="apartment" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  },
  watch: {},
  created() {},
  methods: {
    ...mapActions("Auth", ["changeUserPhone"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
</style>
