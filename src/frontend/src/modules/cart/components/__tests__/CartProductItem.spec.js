import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
// Импортируем сам компонент.
import CartProductItem from "@/modules/cart/components/CartProductItem";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

// Указываем название блока тестов — соответствует названию компонента.
describe("CartProductItem", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    pizza: {
      composition: {
        classPizza: "pizza--foundation--small-creamy",
        dough: {
          id: 1,
          price: 300,
          value: "light",
        },
        id: 2,
        ingr: [
          {
            count: 0,
            id: 1,
            image: "/public/img/filling/mushrooms.svg",
            label: "mushrooms",
            name: "Грибы",
            price: 33,
          },
          {
            count: 1,
            id: 2,
            image: "/public/img/filling/salami.svg",
            label: "salami",
            name: "Салями",
            price: 42,
          },
          {
            count: 0,
            id: 3,
            image: "/public/img/filling/cheddar.svg",
            label: "cheddar",
            name: "Чеддер",
            price: 42,
          },
          {
            count: 0,
            id: 4,
            image: "/public/img/filling/ham.svg",
            label: "ham",
            name: "Ветчина",
            price: 42,
          },
          {
            count: 0,
            id: 5,
            image: "/public/img/filling/olives.svg",
            label: "olives",
            name: "Маслины",
            price: 25,
          },
          {
            count: 0,
            id: 6,
            image: "/public/img/filling/jalapeno.svg",
            label: "jalapeno",
            name: "Халапеньо",
            price: 25,
          },
          {
            count: 0,
            id: 7,
            image: "/public/img/filling/chile.svg",
            label: "chile",
            name: "Чили",
            price: 21,
          },
          {
            count: 0,
            id: 8,
            image: "/public/img/filling/onion.svg",
            label: "onion",
            name: "Лук",
            price: 21,
          },
          {
            count: 0,
            id: 9,
            image: "/public/img/filling/bacon.svg",
            label: "bacon",
            name: "Бекон",
            price: 42,
          },
          {
            count: 1,
            id: 10,
            image: "/public/img/filling/tomatoes.svg",
            label: "tomatoes",
            name: "Томаты",
            price: 35,
          },
          {
            count: 0,
            id: 11,
            image: "/public/img/filling/ananas.svg",
            label: "ananas",
            name: "Ананас",
            price: 25,
          },
          {
            count: 0,
            id: 12,
            image: "/public/img/filling/salmon.svg",
            label: "salmon",
            name: "Лосось",
            price: 50,
          },
          {
            count: 0,
            id: 13,
            image: "/public/img/filling/mozzarella.svg",
            label: "mozzarella",
            name: "Моцарелла",
            price: 35,
          },
          {
            count: 0,
            id: 14,
            image: "/public/img/filling/parmesan.svg",
            label: "parmesan",
            name: "Пармезан",
            price: 35,
          },
          {
            count: 0,
            id: 15,
            image: "/public/img/filling/blue_cheese.svg",
            label: "blue_cheese",
            name: "Блю чиз",
            price: 50,
          },
        ],
        namePizza: "любимая",
        pizzaFilling: [
          {
            count: 1,
            id: 2,
            name: "salami",
            price: 42,
            title: "салями",
          },
          {
            count: 1,
            id: 10,
            name: "tomatoes",
            price: 35,
            title: "томаты",
          },
        ],
        sauce: {
          id: 1,
          price: 50,
          value: "creamy",
        },
        size: {
          id: 5,
          multiplier: 2,
          value: "normal",
        },
      },
      count: 1,
      dough: "тонком",
      fillings: "салями, томаты",
      id: 2,
      price: 854,
      sauce: "сливочный",
      size: 32,
      title: "любимая",
    },
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartProductItem, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Cart: {
        updatePizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент устанавливает начальное значение счетчика
  it("It sets the initial value counter", () => {
    createComponent({ propsData });
    expect(Number(wrapper.find(".counter__input").element.value)).toBe(
      propsData.pizza.count
    );
  });

  //проверяем, что компонент выводит параметры теста (толщина и размер)
  it("It displays test parameters (thickness and size)", async () => {
    createComponent({ propsData });
    let dough = wrapper.find('[data-test="dough"]');
    expect(dough.text()).toContain(propsData.pizza.size);
    expect(dough.text()).toContain(propsData.pizza.dough);
  });

  //проверяем, что компонент выводит значение атрибута alt в картинке
  it("It displays the value of the alt attribute in the image", async () => {
    createComponent({ propsData });
    let alt = wrapper.find('[data-test="alt"]');
    expect(alt.attributes("alt")).toBe(propsData.pizza.title);
  });

  //проверяем, что компонент выводит название пиццы
  it("It displays the pizza name", async () => {
    createComponent({ propsData });
    let title = wrapper.find('[data-test="title"]');
    expect(title.text()).toBe(propsData.pizza.title);
  });

  //проверяем, что компонент выводит соус
  it("It displays the pizza sauce", async () => {
    createComponent({ propsData });
    let sauce = wrapper.find('[data-test="sauce"]');
    expect(sauce.text()).toContain(propsData.pizza.sauce);
  });

  //проверяем, что компонент выводит список начинок
  it("It displays a list of toppings", () => {
    createComponent({ propsData });
    let fillings = wrapper.find('[data-test="fillings"]');
    expect(fillings.text()).toContain(propsData.pizza.fillings);
  });

  //проверяем, что компонент выводит произведение цена*количество
  it("It displays the product price*quantity", () => {
    createComponent({ propsData });
    let summ = wrapper.find('[data-test="summ"]');
    expect(Number(summ.text().slice(0, -2))).toBe(propsData.pizza.price);
  });

  //проверяем, что компонент вызывает экшн изменения пиццы
  it("It calls the pizza change action", async () => {
    createComponent({ localVue, store, propsData, mocks });
    let btn = wrapper.find('[data-test="change"]');
    await btn.trigger("click");
    expect(actions.Cart.updatePizza).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        ...propsData.pizza,
      }
    );
  });

  //проверяем, что компонент вызывает переход на страницу
  it("It causes a transition to the page", async () => {
    createComponent({ localVue, store, propsData, mocks });
    let btn = wrapper.find('[data-test="change"]');
    await btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + :alt="pizza.title"
  + {{ pizza.title }}
  + {{ pizza.size }}
  + {{ pizza.dough }}
  + {{ pizza.sauce }}
  + {{ pizza.fillings }}
  + v-model="pizza.count"
  + :parent-class="`cart-list__counter`"
  + :color-btn="`counter__button--orange`"
  + {{ pizza.price * pizza.count }}
  + @click="changePizzaMethod(pizza)"
  + ...mapActions("Cart", ["updatePizza"]),
*/

// Данные из тест хранилища
/*
  ...
*/
