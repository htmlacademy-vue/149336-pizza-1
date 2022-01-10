<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutUserSidebar />
      <div class="layout__content">
        <transition
          mode="out-in"
          appear
          name="profile"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
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

<style lang="scss" scoped></style>
