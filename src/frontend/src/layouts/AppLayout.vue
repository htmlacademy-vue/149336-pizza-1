<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = () => import(`@/layouts/AppLayoutMain.vue`);

export default {
  name: "AppLayout",
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
