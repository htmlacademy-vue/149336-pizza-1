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
      <router-link :to="{ name: 'Cart' }">0 ₽</router-link>
    </div>
    <div v-if="auth" class="header__user">
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
            :src="require(`@/assets/img/users/user5.jpg`)"
            :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
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
export default {
  name: "AppLayoutHeader",
  props: {
    auth: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // applyFilters(e) {
    //   this.$emit('applyFilters',{ item: e.target.value, entity: 'search' });
    // }
  },
};
</script>

<style lang="scss" scoped></style>
