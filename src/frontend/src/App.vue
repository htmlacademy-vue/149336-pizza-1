<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  methods: {},
  created() {
    this.$store.dispatch("init");
    console.log(this.$store);
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
