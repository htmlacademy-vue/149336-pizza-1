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
                <label class="dough__input dough__input--light">
                  <input
                    type="radio"
                    name="dought"
                    value="light"
                    class="visually-hidden"
                    checked
                  />
                  <b>Тонкое</b>
                  <span>Из твердых сортов пшеницы</span>
                </label>
                <label class="dough__input dough__input--large">
                  <input
                    type="radio"
                    name="dought"
                    value="large"
                    class="visually-hidden"
                  />
                  <b>Толстое</b>
                  <span>Из твердых сортов пшеницы</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label class="diameter__input diameter__input--small">
                  <input
                    type="radio"
                    name="diameter"
                    value="small"
                    class="visually-hidden"
                  />
                  <span>23 см</span>
                </label>
                <label class="diameter__input diameter__input--normal">
                  <input
                    type="radio"
                    name="diameter"
                    value="normal"
                    class="visually-hidden"
                    checked
                  />
                  <span>32 см</span>
                </label>
                <label class="diameter__input diameter__input--big">
                  <input
                    type="radio"
                    name="diameter"
                    value="big"
                    class="visually-hidden"
                  />
                  <span>45 см</span>
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
                  <label class="radio ingridients__input">
                    <input type="radio" name="sauce" value="tomato" checked />
                    <span>Томатный</span>
                  </label>
                  <label class="radio ingridients__input">
                    <input type="radio" name="sauce" value="creamy" />
                    <span>Сливочный</span>
                  </label>
                </div>
                <div class="ingridients__filling">
                  <p>Начинка:</p>
                  <ul class="ingridients__list">
                    <li
                      v-for="filling in pizzas.ingredients"
                      :key="filling.id"
                      class="ingridients__item"
                    >
                      <span
                        class="filling"
                        :class="getFillingName(filling.image)"
                      >
                        {{ filling.name }}
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

export default {
  name: "IndexHome",
  data() {
    return {
      miscs,
      pizzas,
      users,
    };
  },
  methods: {
    getFillingName(str) {
      let st = str.slice(str.lastIndexOf("/") + 1, -4);
      return `filling--${st}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
