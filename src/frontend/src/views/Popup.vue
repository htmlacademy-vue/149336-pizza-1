<template>
  <transition name="slide-fade">
    <div class="popup">
      <a href="" @click.prevent="closePopupMethod" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="" class="button" @click.prevent="closePopupMethod"
          >Отлично, я жду!</a
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Popup",
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
    }),
  },
  watch: {},
  created() {},
  methods: {
    ...mapActions("Builder", ["resetBuilder"]),
    ...mapActions("Cart", ["resetPizzas"]),

    closePopupMethod() {
      this.resetBuilder();
      this.resetPizzas();
      this.user
        ? this.$router.push({ name: "Orders" })
        : this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/close.scss";

/*.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: scale(1.5);
  opacity: 0;
}*/
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all $animationSpeed;
}
.slide-fade-enter,
.slide-fade-leave {
  opacity: 0;
  transform: scale(-1.5);
}
</style>
