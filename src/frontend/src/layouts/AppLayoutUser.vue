<template>
  <div class="app-layout-main">
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

export default {
  name: "AppLayoutUser",
  components: {
    AppLayoutHeader,
    AppLayoutUserSidebar,
  },
};
</script>
