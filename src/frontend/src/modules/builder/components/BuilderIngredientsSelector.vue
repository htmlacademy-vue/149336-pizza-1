<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="item in sauces"
          :key="item.id"
          :data="item"
          :classRadioBtn="`ingridients__input`"
        />
      </div>
      <div class="ingridients__filling">
        <p>Начинка:</p>
        <ul class="ingridients__list">
          <li
            v-for="item in ingredients"
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

export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  watch: {
    ingredients: {
      handler: () => {},
      deep: true,
    },
  },
  components: {
    ItemCounter,
    RadioButton,
    AppDrag,
    AppDrop,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/filling.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
