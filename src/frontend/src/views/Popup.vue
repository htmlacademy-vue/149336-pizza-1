<template>
  <div class="wrapper">
    <!--<transition
      mode="out-in"
      appear
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >-->
    <transition
      name="view"
      appear
      mode="in-out"
      @enter="enter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="popup">
        <a href="" @click.prevent="leave" class="close" data-test="close">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a href="" class="button" @click.prevent="leave" data-test="ok"
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
  data() {
    return {
      element: "",
      done: "",
    };
  },
  computed: {
    ...mapState("Auth", {
      user: (state) => state.user,
    }),
  },
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

    // --------
    // ПОЯВЛЕНИЕ
    // --------
    enter: function (el, done) {
      this.element = el;
      this.done = done;
      el.classList.add("animate__animated", "animate__zoomIn");

      el.addEventListener("animationend", () => {});
      done();
    },

    // --------
    // ИСЧЕЗНОВЕНИЕ
    // --------
    leave: function (el, done) {
      if (
        el.target.classList.contains("button") ||
        el.target.classList.contains("close")
      ) {
        this.element.classList.remove("animate__zoomIn");
        this.element.classList.add("animate__zoomOut");
        this.element.addEventListener("animationend", () => {
          this.element.classList.remove(
            "animate__animated",
            "animate__zoomOut"
          );
          this.closePopupMethod();
          this.done();
        });
      } else {
        el.classList.remove("animate__zoomIn");
        el.classList.add("animate__zoomOut");
        el.addEventListener("animationend", () => {
          el.classList.remove("animate__animated", "animate__zoomOut");
          this.closePopupMethod();
        });
        done();
      }
    },

    afterLeave: function (el) {
      el.style.visibility = "hidden";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/layout/popup.scss";
@import "~@/assets/scss/blocks/close.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";

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
