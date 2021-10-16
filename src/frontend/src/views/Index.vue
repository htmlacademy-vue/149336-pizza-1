<template>
  <main class="content">
    <form action="#" method="post">
      <AppDrop class="content__wrapper" @drop="moveIngridient">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <BuilderDoughSelector />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector @drop="moveIngridient($event)" />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView />
        </div>
      </AppDrop>
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

import { mapState, mapActions } from "vuex";

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
    ...mapState("Cart", ["orders"]),
  },
  mounted: function () {
    this.changeTotalPrice();
    // this.resetBuilder();
  },
  methods: {
    ...mapActions("Builder", ["changeTotalPrice", "resetBuilder"]),

    moveIngridient(active) {
      if (active.count > 2) {
        return;
      }
      this.changeCounter(active.count + 1, active.id);
      let ingredientsToUpdate = this.composition.ingr;
      this.$emit("updateIngredients", ingredientsToUpdate);
    },
  },
};
</script>

<style lang="scss" scoped></style>
