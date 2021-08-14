<template>
  <div class="app-layout">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            :src="require(`@/assets/img/logo.svg`)"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <IndexHome />
  </div>
</template>

<script>
import IndexHome from "@/views/Index";

export default {
  name: "AppLayout",
  components: {
    IndexHome,
  },
};
</script>

<style lang="scss" scoped></style>
