<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'IndexHome' }" class="logo">
        <img
          :src="require(`@/assets/img/logo.svg`)"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }"
        >{{ total_price_order }} ₽</router-link
      >
    </div>
    <div v-if="isAuthenticated" class="header__user">
      <router-link :to="{ name: 'Profile' }">
        <picture>
          <source
            type="image/webp"
            :srcset="
              require(`@/assets/img/users/user5.webp`) +
              ' 1x, ' +
              require(`@/assets/img/users/user5@2x.webp`) +
              ' 2x'
            "
          />
          <img
            :src="user.avatar"
            :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a href="" class="header__logout" @click="$logout">
        <span>Выйти</span>
      </a>
    </div>
    <div v-else class="header__user">
      <a class="header__login" @click="$router.push('/login')">
        <span>Войти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Cart", {
      total_price_order: (state) => state.totalPriceOrder,
    }),

    user() {
      return this.Auth.user || {};
    },

    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/header.scss";
</style>
