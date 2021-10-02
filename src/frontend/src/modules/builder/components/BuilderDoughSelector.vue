<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="item in DOUGHS"
        :key="item.id"
        :name="`dough`"
        :value="item.type"
        v-model="checkedDough"
        :classRadioBtn="`dough__input dough__input--${item.type}`"
        :classRadioInput="`visually-hidden`"
        @change="$emit('change', $event, item.price)"
      >
        <b>{{ item.name }}</b>
        <span>{{ item.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      checkedDough: "light",
    };
  },
  computed: {
    ...mapGetters({
      DOUGHS: "Builder/DOUGHS",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/dough.scss";
</style>
