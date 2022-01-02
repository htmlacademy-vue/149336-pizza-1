<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <slot />
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
