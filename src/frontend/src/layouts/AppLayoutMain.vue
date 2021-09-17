<template>
  <div class="app-layout-main">
    <AppLayoutHeader :auth="auth" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  props: {
    auth: {
      type: Boolean,
      required: true,
    },
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
