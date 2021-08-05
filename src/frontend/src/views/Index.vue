<template>
  <div id="layout">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            :src="require(`@/assets/img/logo.svg`)"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <label
                  v-for="item in dough"
                  :key="item.id"
                  class="dough__input"
                  :class="`dough__input--${item.type}`"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="item.type"
                    class="visually-hidden"
                    :checked="item.isChecked"
                  />
                  <b>{{ item.name }}</b>
                  <span>{{ item.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="item in sizes"
                  :key="item.id"
                  class="diameter__input"
                  :class="`diameter__input--${item.size}`"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="item.size"
                    class="visually-hidden"
                    :checked="item.isChecked"
                  />
                  <span> {{ item.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>
              <div class="sheet__content ingridients">
                <div class="ingridients__sauce">
                  <p>Основной соус:</p>
                  <label
                    v-for="item in sauces"
                    :key="item.id"
                    class="radio ingridients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="item.value"
                      :checked="item.isChecked"
                    />
                    <span>{{ item.name }}</span>
                  </label>
                </div>
                <div class="ingridients__filling">
                  <p>Начинка:</p>
                  <ul class="ingridients__list">
                    <li
                      v-for="item in ingredients"
                      :key="item.id"
                      class="ingridients__item"
                    >
                      <span class="filling" :class="`filling--${item.label}`">
                        {{ item.name }}
                      </span>
                      <div class="counter counter--orange ingridients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";

import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
} from "@/common/helpers";

export default {
  name: "IndexHome",
  data() {
    return {
      miscs,
      dough: pizzas.dough.map((item) => normalizeDough(item)),
      sizes: pizzas.sizes.map((item) => normalizeSizes(item)),
      sauces: pizzas.sauces.map((item) => normalizeSauces(item)),
      ingredients: pizzas.ingredients.map((item) => normalizeIngredients(item)),
      pizzas,
      users,
    };
  },
};
</script>

<style lang="scss" scoped></style>
