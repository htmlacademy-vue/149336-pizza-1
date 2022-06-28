import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/common/helpers";
// Импортируем сам компонент.
import OrdersAdditionalItem from "@/modules/orders/components/OrdersAdditionalItem";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const misc = [
  {
    id: 1,
    name: "Cola-Cola 0,5 литра",
    image: "/public/img/cola.svg",
    price: 56,
    count: 0,
  },
  {
    id: 2,
    name: "Картошка из печи",
    image: "/public/img/potato.svg",
    price: 170,
    count: 0,
  },
  {
    id: 3,
    name: "Острый соус",
    image: "/public/img/sauce.svg",
    price: 10,
    count: 0,
  },
];

const getMiscs = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc,
  });
};

// Указываем название блока тестов — соответствует названию компонента.
describe("OrdersAdditionalItem", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let store;
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    miscItem: {
      id: 1,
      quantity: 2,
      orderId: 1,
      miscId: 1,
      price: 56,
    },
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(OrdersAdditionalItem, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    store = generateMockStore();
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it("is rendered", () => {
    authenticateUser(store);
    getMiscs(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент выводит путь к картинке в атрибуте src
  it("It displays the path to the image in the src attribute", () => {
    authenticateUser(store);
    getMiscs(store);
    createComponent({ localVue, store, propsData });
    let src = wrapper.find('[data-test="img"]');
    expect(src.attributes("src")).toBe("/public/img/cola.svg");
  });

  //проверяем, что компонент выводит значение атрибута alt в картинке
  it("It displays the value of the alt attribute in the image", () => {
    authenticateUser(store);
    getMiscs(store);
    createComponent({ localVue, store, propsData });
    let alt = wrapper.find('[data-test="img"]');
    expect(alt.attributes("alt")).toBe("Cola-Cola 0,5 литра");
  });

  //проверяем, что компонент выводит название товара
  it("It displays the name of the additional product", () => {
    authenticateUser(store);
    getMiscs(store);
    createComponent({ localVue, store, propsData });
    let name = wrapper.find('[data-test="name"]');
    expect(name.text()).toBe("Cola-Cola 0,5 литра");
  });

  //проверяем, что компонент выводит сумму товара
  it("It displays the amont of the additional product", () => {
    authenticateUser(store);
    getMiscs(store);
    createComponent({ localVue, store, propsData });
    let name = wrapper.find('[data-test="sum"]');
    expect(name.text()).toBe(
      `${propsData.miscItem.price * propsData.miscItem.quantity} ₽`
    );
  });
});

// Список элементов для тестирования
/*
  + :src="miscItemInfo[0].image"
  + :alt="miscItemInfo[0].name"
  + {{ miscItemInfo[0].name }}
  + {{ miscItemInfo[0].sum }}
*/

// Данные из тест хранилища
/*
  ...mapState("Orders", ["orders"]),
  ...mapState("Cart", ["misc"]),
*/
