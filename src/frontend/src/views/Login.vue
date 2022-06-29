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
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="login">
            <div class="sign-form__input">
              <label class="input">
                <span>E-mail</span>
                <ValidationProvider
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
                    :error-text="errors[0]"
                    data-test="email-component"
                  />
                </ValidationProvider>
              </label>
            </div>

            <div class="sign-form__input">
              <label class="input">
                <span>Пароль</span>
                <ValidationProvider
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
                    :error-text="errors[0]"
                    data-test="password-component"
                  />
                </ValidationProvider>
              </label>
            </div>
            <button type="submit" class="button" :disabled="invalid">
              Авторизоваться
            </button>
          </form>
        </ValidationObserver>
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
