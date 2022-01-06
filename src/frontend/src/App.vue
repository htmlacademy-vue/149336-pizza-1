<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    // Note: check auth
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    // Note: fetch initial data
    this.$store.dispatch("init");
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all $animationSpeed;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
