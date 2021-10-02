<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="item in SAUCES"
          :key="item.id"
          :name="`sauce`"
          :value="item.value"
          v-model="checkedSouce"
          :classRadioBtn="`radio ingridients__input`"
          @change="$emit('change', $event, item.price)"
        >
          <span>{{ item.name }}</span>
        </RadioButton>
      </div>
      <div class="ingridients__filling">
        <p>Начинка:</p>
        <ul class="ingridients__list">
          <li
            v-for="item in COMPOSITION.ingr"
            :key="item.id"
            class="ingridients__item"
          >
            <AppDrop @drop="$emit('drop', $event)">
              <AppDrag :transfer-data="item">
                <span class="filling" :class="`filling--${item.label}`">
                  {{ item.name }}
                </span>
              </AppDrag>
            </AppDrop>
            <ItemCounter
              v-model="item.count"
              @input="$emit('input', $event, item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import { mapGetters } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    AppDrag,
    AppDrop,
  },
  data() {
    return {
      checkedSouce: "tomato",
    };
  },
  computed: {
    ...mapGetters({
      SAUCES: "Builder/SAUCES",
      COMPOSITION: "Builder/COMPOSITION",
    }),

    // ingredients() {
    //   return this.$store.getters["Builder/COMPOSITION"].ingr;
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/filling.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
