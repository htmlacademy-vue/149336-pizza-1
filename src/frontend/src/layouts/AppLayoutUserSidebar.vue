<template>
  <div class="layout__sidebar sidebar">
    <router-link :to="{ name: 'IndexHome' }" class="logo layout__logo">
      <img
        :src="require(`@/assets/img/logo.svg`)"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      :to="{ name: 'Orders' }"
      class="layout__link"
      active-class="layout__link--active"
      href="#"
    >
      История заказов
    </router-link>
    <router-link
      :to="{ name: 'Profile' }"
      class="layout__link"
      active-class="layout__link--active"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutUserSidebar",
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/layout/header.scss";

.layout__link--active {
  cursor: default;
}
</style>
