<template>
  <div class="app-layout-default">
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
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
    AppNotifications,
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

.slide-enter-active,
.slide-leave-active {
  transition: all $animationSpeed;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
