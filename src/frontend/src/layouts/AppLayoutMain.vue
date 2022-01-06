<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <transition name="slide" mode="out-in">
      <slot />
    </transition>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
    AppNotifications,
  },
};
</script>

<style lang="scss" scoped>
.app-layout-main {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: all $animationSpeed;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(5%);
}
</style>
