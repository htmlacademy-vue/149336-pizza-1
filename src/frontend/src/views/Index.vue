<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <BuilderDoughSelector />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            @drop="moveIngridient($event)"
            data-test="changeCounter"
          />
        </div>

        <div class="content__pizza">
          <AppDrop @drop="moveIngridient">
            <BuilderPizzaView />
          </AppDrop>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "IndexHome",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    AppDrop,
  },
  computed: {
    ...mapState("Builder", ["composition"]),

    ...mapGetters({
      getTotalPrice: "Builder/getTotalPrice",
    }),
  },
  methods: {
    ...mapActions("Builder", ["changeCounter"]),

    moveIngridient(active) {
      if (active.count > 2) {
        return;
      }
      let payload = {
        newCount: active.count + 1,
        id: active.id,
      };
      this.changeCounter(payload);
      let ingredientsToUpdate = this.composition.ingr;
      this.$emit("updateIngredients", ingredientsToUpdate);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/title.scss";
</style>
