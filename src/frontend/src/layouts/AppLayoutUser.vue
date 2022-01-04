<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutUserSidebar />
      <div class="layout__content">
        <slot />
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
