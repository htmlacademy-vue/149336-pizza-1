<template>
  <div class="wrapper">
    <transition
      mode="out-in"
      appear
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <div class="sign-form">
        <router-link
          :to="{ name: 'IndexHome' }"
          class="close close--white"
          data-test="close-button"
        >
          <span class="visually-hidden">Закрыть форму авторизации</span>
        </router-link>
        <div class="sign-form__title">
          <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="login">
            <div class="sign-form__input">
              <label class="input">
                <span>E-mail</span>
                <validation-provider
                  name="E-mail"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <AppInput
                    v-model="email"
                    type="email"
                    name="email"
                    class="input"
                    placeholder="example@mail.ru"
                    :errorText="errors[0]"
                    data-test="email-component"
                  />
                </validation-provider>
              </label>
            </div>

            <div class="sign-form__input">
              <label class="input">
                <span>Пароль</span>
                <validation-provider
                  name="Пароль"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <AppInput
                    v-model="password"
                    type="password"
                    name="pass"
                    class="input"
                    placeholder="***********"
                    :errorText="errors[0]"
                    data-test="password-component"
                  />
                </validation-provider>
              </label>
            </div>
            <button type="submit" class="button" :disabled="invalid">
              Авторизоваться
            </button>
          </form>
        </validation-observer>
      </div>
    </transition>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import ru from "vee-validate/dist/locale/ru.json";

localize("ru", ru);

extend("email", email);
extend("required", required);

export default {
  name: "Login",
  components: {
    AppInput,
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/layout/sign-form.scss";
@import "~@/assets/scss/blocks/close.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";

.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
}

.sign-form {
  margin: auto;
  position: relative;
  transform: none;
  top: 0;
  left: 0;
}
</style>
