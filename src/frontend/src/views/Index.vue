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
                  v-for="dough in pizzas.dough"
                  :key="dough.id"
                  class="dough__input"
                  :class="getDoughName(dough.image)"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="getName('-', -4, dough.image)"
                    class="visually-hidden"
                    :checked="dough.name === 'Тонкое'"
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="size in pizzas.sizes"
                  :key="size.id"
                  class="diameter__input"
                  :class="getClassDiameter(size.multiplier)"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="getClass(size.multiplier)"
                    class="visually-hidden"
                    :checked="size.id === 2"
                  />
                  <span> {{ size.name }}</span>
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
                    v-for="sauce in pizzas.sauces"
                    :key="sauce.id"
                    class="radio ingridients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="getValueSauce(sauce.name)"
                      :checked="sauce.name === 'Томатный'"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                  <!-- <label class="radio ingridients__input">
                    <input type="radio" name="sauce" value="creamy" />
                    <span>Сливочный</span>
                  </label> -->
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
    getName(symb, end, str) {
      let st = str.slice(str.lastIndexOf(symb) + 1, end);
      return st;
    },
    getFillingName(str) {
      return `filling--${this.getName("/", -4, str)}`;
    },
    getDoughName(string) {
      return `dough__input--${this.getName("-", -4, string)}`;
    },
    getClass(multiplier) {
      let className =
        multiplier === 1
          ? "small"
          : multiplier === 2
          ? "normal"
          : multiplier === 3
          ? "big"
          : "";
      return className;
    },
    getClassDiameter(multiplier) {
      let diameter = this.getClass(multiplier);
      let className =
        diameter === "small"
          ? "diameter__input--small"
          : diameter === "normal"
          ? "diameter__input--normal"
          : diameter === "big"
          ? "diameter__input--big"
          : "";
      return className;
    },
    getValueSauce(sauceName) {
      let sauce =
        sauceName === "Томатный"
          ? "tomato"
          : sauceName === "Сливочный"
          ? "creamy"
          : "";
      return sauce;
    },
  },
};
</script>

<style lang="scss" scoped></style>
