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
        >{{ TOTAL_PRICE_ORDER }} ₽</router-link
      >
    </div>
    <div v-if="USER" class="header__user">
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
            :src="USER.avatar"
            :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
            :alt="USER.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ USER.name }}</span>
      </router-link>
      <router-link :to="{ name: '' }" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
    <div v-else class="header__user">
      <router-link :to="{ name: 'Login' }" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters(["USER"]),
    ...mapState("Cart", {
      PIZZAS: (state) => state.pizzas,
      TOTAL_PRICE_ORDER: (state) => state.totalPriceOrder,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
