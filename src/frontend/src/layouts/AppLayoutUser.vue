<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutUserSidebar />
      <div class="layout__content">
        <transition name="slide" mode="out-in">
          <slot />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutUserSidebar from "@/layouts/AppLayoutUserSidebar";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutUser",
  components: {
    AppLayoutHeader,
    AppLayoutUserSidebar,
    AppNotifications,
  },
};
</script>

<style lang="scss" scoped>
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
