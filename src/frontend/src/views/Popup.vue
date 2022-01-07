<template>
  <div class="wrapper">
    <transition
      mode="out-in"
      appear
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
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
  </div>
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

.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
}

.popup {
  margin: auto;
  position: relative;
  transform: none;
  top: 0;
  left: 0;
}
</style>
