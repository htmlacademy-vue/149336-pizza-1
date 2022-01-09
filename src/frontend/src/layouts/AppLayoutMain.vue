<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <transition
      mode="out-in"
      appear
      name="profile"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutDown"
    >
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
</style>
