<template>
  <div class="app-layout-default">
    <AppLayoutHeader :isAuth="isAuth" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
  props: {
    isAuth: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.app-layout-default {
  display: flex;
  flex-direction: column;

  height: 100vh;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
}
</style>
