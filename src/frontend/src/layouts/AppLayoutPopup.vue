<template>
  <div class="app-layout-default">
    <AppNotifications />
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutPopup",
  components: {
    AppLayoutHeader,
    AppNotifications,
  },
};
</script>

<style lang="scss" scoped>
.app-layout-default {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>
