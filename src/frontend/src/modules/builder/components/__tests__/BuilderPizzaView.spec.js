import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {
  UPDATE_NAME_PIZZA,
  CHANGE_COUNTER,
  SET_LONG_ENTITY,
} from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
// Импортируем сам компонент.
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const namePizza = "Салями-Ветчина";

const setNamePizza = (store) => {
  store.commit("Builder/" + UPDATE_NAME_PIZZA, namePizza);
};

const ingridients = [
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
    count: 0,
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
    count: 0,
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
];

const getIngridients = (store) => {
  store.commit(SET_LONG_ENTITY, {
    entity: "ingr",
    module: "Builder",
    path: "composition",
    value: ingridients,
  });
};

const pizzaFilling = [
  {
    id: 3,
    count: 1,
    name: "salami",
    price: 42,
    title: "салями",
  },
  {
    id: 4,
    count: 2,
    name: "tomatoes",
    price: 35,
    title: "томаты",
  },
];

const setFillings = (store) => {
  for (let i = 0; i < pizzaFilling.length; i++) {
    store.commit("Builder/" + CHANGE_COUNTER, {
      newCount: pizzaFilling[i].count,
      id: pizzaFilling[i].id,
    });
  }
};

// Указываем название блока тестов — соответствует названию компонента.
describe("BuilderPizzaView", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        changeNamePizza: jest.fn(),
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

  //проверяем, что компонент выводит название пиццы
  it("It displays the name of the pizza", () => {
    setNamePizza(store);
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="name"]');
    expect(name.element.value).toBe(namePizza);
  });

  //проверяем, что компонент вызывает экшн переименования пиццы
  it("It calls the pizza rename action", async () => {
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="name"]');
    let str = "Проверка";
    name.element.value = str;
    await name.trigger("input");
    expect(actions.Builder.changeNamePizza).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      str
    );
  });

  //проверяем, что компонент выводит картинки согласно выбранным добавкам
  it("It displays pictures according to the selected additives", () => {
    getIngridients(store);
    setFillings(store);
    createComponent({ localVue, store });
    let fils = wrapper.findAll('[data-test="fillings"]');
    let newArr = [];
    pizzaFilling.forEach((element) => {
      newArr.push(element.count);
    });
    let count = newArr.reduce((sum, current) => sum + current, 0);
    expect(fils.length).toBe(count);
    let filFirst = wrapper.find('[data-test="fillings"]:first-of-type');
    expect(filFirst.attributes("class")).toContain("pizza__filling--salami");
    let filSecond = wrapper.find('[data-test="fillings"]:nth-of-type(2)');
    expect(filSecond.attributes("class")).toContain("pizza__filling--tomatoes");
    let filThird = wrapper.find('[data-test="fillings"]:last-of-type');
    expect(filThird.attributes("class")).toContain("pizza__filling--second");
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["changeNamePizza"]),
  + :value="namePizza"
  + @input="updatePizzaName($event.target.value)"
  + :class="classPizza"
  + :class="[
  +   {
  +     'pizza__filling--second': `${item.id}`.slice(-1) === '1',
  +     'pizza__filling--third': `${item.id}`.slice(-1) === '2',
  +   },
  +   `pizza__filling--${item.name}`,
  +  ]"
*/

// Данные из тест-хранилища
/*
  + ...mapState("Builder", {
  +     classPizza: (state) => state.composition.classPizza,
  +     pizzaFil: (state) => state.composition.pizzaFilling,
  +     namePizza: (state) => state.composition.namePizza,
  +   }),
*/
