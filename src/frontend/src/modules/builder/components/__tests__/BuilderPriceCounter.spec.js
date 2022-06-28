import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { SET_ENTITY, CREATE_PIZZA } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/common/helpers";
// Импортируем сам компонент.
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const totalPrice = 884;

const composition = {
  dough: {
    id: 1,
    value: "light",
    price: 300,
  },
  size: {
    id: 3,
    value: "normal",
    multiplier: 2,
  },
  sauce: {
    id: 1,
    value: "creamy",
    price: 50,
  },
  ingr: [
    {
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
      label: "mushrooms",
      count: 0,
    },
    {
      id: 2,
      name: "Чеддер",
      image: "/public/img/filling/cheddar.svg",
      price: 42,
      label: "cheddar",
      count: 0,
    },
    {
      id: 3,
      name: "Салями",
      image: "/public/img/filling/salami.svg",
      price: 42,
      label: "salami",
      count: 1,
    },
    {
      id: 4,
      name: "Томаты",
      image: "/public/img/filling/tomatoes.svg",
      price: 35,
      label: "tomatoes",
      count: 0,
    },
    {
      id: 5,
      name: "Лосось",
      image: "/public/img/filling/salmon.svg",
      price: 50,
      label: "salmon",
      count: 1,
    },
    {
      id: 6,
      name: "Моцарелла",
      image: "/public/img/filling/mozzarella.svg",
      price: 35,
      label: "mozzarella",
      count: 0,
    },
    {
      id: 7,
      name: "Чили",
      image: "/public/img/filling/chile.svg",
      price: 21,
      label: "chile",
      count: 0,
    },
    {
      id: 8,
      name: "Ананас",
      image: "/public/img/filling/ananas.svg",
      price: 25,
      label: "ananas",
      count: 0,
    },
    {
      id: 9,
      name: "Бекон",
      image: "/public/img/filling/bacon.svg",
      price: 42,
      label: "bacon",
      count: 0,
    },
    {
      id: 10,
      name: "Ветчина",
      image: "/public/img/filling/ham.svg",
      price: 42,
      label: "ham",
      count: 0,
    },
    {
      id: 11,
      name: "Пармезан",
      image: "/public/img/filling/parmesan.svg",
      price: 35,
      label: "parmesan",
      count: 0,
    },
    {
      id: 12,
      name: "Блю чиз",
      image: "/public/img/filling/blue_cheese.svg",
      price: 50,
      label: "blue_cheese",
      count: 0,
    },
    {
      id: 13,
      name: "Лук",
      image: "/public/img/filling/onion.svg",
      price: 21,
      label: "onion",
      count: 0,
    },
    {
      id: 14,
      name: "Маслины",
      image: "/public/img/filling/olives.svg",
      price: 25,
      label: "olives",
      count: 0,
    },
    {
      id: 15,
      name: "Халапеньо",
      image: "/public/img/filling/jalapeno.svg",
      price: 25,
      label: "jalapeno",
      count: 0,
    },
  ],
  classPizza: "pizza--foundation--small-creamy",
  pizzaFilling: [
    {
      id: 3,
      count: 1,
      name: "salami",
      price: 42,
      title: "салями",
    },
    {
      id: 5,
      count: 1,
      name: "salmon",
      price: 50,
      title: "лосось",
    },
  ],
  namePizza: "Салями",
};

const pizza = {
  ...composition,
  id: 1,
};

const createPizza = (store) => {
  store.commit("Cart/" + CREATE_PIZZA, {
    composition: composition,
    getTotalPrice: totalPrice,
  });
};

const editPizza = (store) => {
  store.commit("Cart/" + CREATE_PIZZA, {
    composition: pizza,
    getTotalPrice: totalPrice,
  });
};

const setTotalPrice = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "composition",
    value: composition,
  });
};

const setEditableTotalPrice = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "composition",
    value: pizza,
  });
};

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

// Указываем название блока тестов — соответствует названию компонента.
describe("BuilderPriceCounter", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Cart: {
        createPizza: jest.fn(),
        editPizza: jest.fn(),
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
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент отображает итоговую цену
  it("It displays the total price", () => {
    authenticateUser(store);
    createPizza(store);
    setTotalPrice(store);
    createComponent({ localVue, store });
    let price = wrapper.find('[data-test="price"]');
    expect(price.text()).toContain(totalPrice);
  });

  //проверяем, что компонент вызывает экшн создания пиццы createPizza
  it("It calls the createPizza pizza change action", async () => {
    authenticateUser(store);
    createPizza(store);
    setTotalPrice(store);
    createComponent({ localVue, store, mocks });
    let createBtn = wrapper.find('[data-test="create"]');
    await wrapper.vm.$nextTick();
    expect(createBtn.attributes("disabled")).not.toBe("disabled");
    expect(createBtn.text()).toBe("Готовьте!");
    await createBtn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalled();
    expect(actions.Cart.createPizza).toHaveBeenCalled();
  });

  //проверяем, что компонент вызывает экшн изменения пиццы editPizza
  it("It calls the editPizza pizza change action", async () => {
    authenticateUser(store);
    editPizza(store);
    setEditableTotalPrice(store);
    createComponent({ localVue, store, mocks });
    let editBtn = wrapper.find('[data-test="edit"]');
    expect(editBtn.attributes("disabled")).not.toBe("disabled");
    expect(editBtn.text()).toBe("Сохранить");
    await editBtn.trigger("click");
    expect(actions.Cart.editPizza).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Cart", ["createPizza", "editPizza"]),
*/

// Данные из тест-хранилища
/*
  + ...mapState("Auth", {
  +     isAuthenticated: (state) => state.isAuthenticated,
  +   }),

  +   ...mapState("Builder", {
  +     composition: (state) => state.composition,
  +     namePizza: (state) => state.composition.namePizza,
  +     pizzaFilling: (state) => state.composition.pizzaFilling,
  +   }),
*/
