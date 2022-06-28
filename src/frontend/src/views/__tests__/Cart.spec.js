import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {
  CREATE_PIZZA,
  UPDATE_RECIPIENT,
  SET_ENTITY,
  UPDATE_USER_ADDRESS,
} from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
import Cart from "@/views/Cart.vue";
import { authenticateUser } from "@/common/helpers";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const pizza = {
  composition: {
    dough: {
      id: 1,
      value: "large",
      price: 300,
    },
    size: {
      id: 2,
      value: "normal",
      multiplier: 2,
    },
    sauce: {
      id: 2,
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
        count: 1,
      },
      {
        id: 5,
        name: "Маслины",
        image: "/public/img/filling/olives.svg",
        price: 25,
        label: "olives",
        count: 0,
      },
      {
        id: 6,
        name: "Лук",
        image: "/public/img/filling/onion.svg",
        price: 21,
        label: "onion",
        count: 0,
      },
      {
        id: 7,
        name: "Бекон",
        image: "/public/img/filling/bacon.svg",
        price: 42,
        label: "bacon",
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
        name: "Чили",
        image: "/public/img/filling/chile.svg",
        price: 21,
        label: "chile",
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
        name: "Лосось",
        image: "/public/img/filling/salmon.svg",
        price: 50,
        label: "salmon",
        count: 0,
      },
      {
        id: 12,
        name: "Моцарелла",
        image: "/public/img/filling/mozzarella.svg",
        price: 35,
        label: "mozzarella",
        count: 0,
      },
      {
        id: 13,
        name: "Халапеньо",
        image: "/public/img/filling/jalapeno.svg",
        price: 25,
        label: "jalapeno",
        count: 0,
      },
      {
        id: 14,
        name: "Пармезан",
        image: "/public/img/filling/parmesan.svg",
        price: 35,
        label: "parmesan",
        count: 0,
      },
      {
        id: 15,
        name: "Блю чиз",
        image: "/public/img/filling/blue_cheese.svg",
        price: 50,
        label: "blue_cheese",
        count: 0,
      },
    ],
    classPizza: "pizza--foundation--small-creamy",
    pizzaFilling: [
      { id: 3, count: 1, name: "salami", price: 42, title: "салями" },
      { id: 4, count: 1, name: "tomatoes", price: 35, title: "томаты" },
    ],
    namePizza: "любимая",
    id: 1,
  },
  id: 1,
  count: 1,
  title: "любимая",
  size: 32,
  dough: "толстом",
  sauce: "сливочный",
  fillings: "салями, томаты",
  price: 854,
};

const createPizza = (store) => {
  store.commit("Cart/" + CREATE_PIZZA, {
    composition: pizza.composition,
    getTotalPrice: pizza.price,
  });
};

const recipient = {
  recipient: "new",
};

const selectNewAddress = (store) => {
  store.commit("Cart/" + UPDATE_RECIPIENT, {
    data: recipient,
  });
};

const recipientSaved = {
  recipient: "1",
};

const selectSavedAddress = (store) => {
  store.commit("Cart/" + UPDATE_RECIPIENT, {
    data: recipientSaved,
  });
};

const savedAddresses = [
  {
    building: "204",
    comment: "Предпочтительный адрес",
    flat: "70",
    id: 1,
    name: "Дом",
    street: "Дзержинского",
    userId: "a2283d8a-142d-424b-bd84-cfc9bfbf9f43",
  },
];

const saveAddress = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "addresses",
    value: savedAddresses,
  });
};

const address = {
  apartment: savedAddresses[0].flat,
  house: savedAddresses[0].building,
  street: savedAddresses[0].street,
};

const setAddress = (store) => {
  store.commit("Cart/" + UPDATE_USER_ADDRESS, {
    data: address,
  });
};

const order = {
  userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
  phone: "",
  pizzas: [
    {
      doughId: 1,
      ingredients: [
        // {
        //   ingredientId: 3,
        //   quantity: 1,
        // },
        // {
        //   ingredientId: 4,
        //   quantity: 1,
        // }
      ],
      name: "любимая",
      quantity: 1,
      sauceId: 2,
      sizeId: 2,
    },
  ],
  misc: [],
  address: {
    building: "204",
    comment: "",
    flat: "70",
    id: "1",
    name: "ул.Дзержинского, д.204, кв.70",
    street: "Дзержинского",
    userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
  },
};

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

// Начало блока тестов
describe("Cart", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-view"];

  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Auth: {
        queryAddresses: jest.fn(),
        newAddresses: jest.fn(),
      },
      Builder: {
        resetBuilder: jest.fn(),
      },
      Cart: {
        updateUserRecipient: jest.fn(),
        updateUserAddress: jest.fn(),
        resetUserAddress: jest.fn(),
      },
      Orders: {
        newOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что Корзина пуста и отображается сообщение об этом
  it("is empty cart", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".cart__empty").text()).toBe(
      "В корзине нет ни одного товара"
    );
  });

  //проверяем корректность вызова экшена newAddresses (доставка на новый адрес)
  it("calls newAddresses action", async () => {
    authenticateUser(store);
    createPizza(store);
    createComponent({ localVue, store, stubs });
    selectNewAddress(store);
    const options = wrapper.find(".select").findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe("new");
    const addr = wrapper.find('[data-test="new-addresses"]');
    await addr.trigger("click");
    expect(actions.Cart.updateUserRecipient).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        recipient: "new",
      }
    );
  });

  //проверяем создание заказа на сохраненный адрес
  it("calls newOrder action", async () => {
    authenticateUser(store);
    createPizza(store);
    saveAddress(store);
    wrapper = mount(Cart, {
      attachTo: document.getElementById("root"),
      localVue,
      store,
      stubs,
      mocks,
    });
    selectSavedAddress(store);
    setAddress(store);
    const options = wrapper.find(".select").findAll("option");
    await options.at(2).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe("1");
    const addr = wrapper.find('[data-test="new-addresses"]');
    await addr.trigger("click");
    expect(actions.Orders.newOrder).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        ...order,
      }
    );
  });

  //проверяем корректность вызова экшена resetBuilder (сброс конструктора пицц)
  it("calls resetBuilder action", async () => {
    authenticateUser(store);
    createPizza(store);
    createComponent({ localVue, store, stubs, mocks });
    const resetBtn = wrapper.find('[data-test="resetBuilder"]');
    await resetBtn.trigger("click");
    expect(actions.Builder.resetBuilder).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["resetBuilder"]),
  +  ...mapActions("Auth", ["queryAddresses", "newAddresses"]),
  +  ...mapActions("Orders", ["newOrder"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
  }),
  ...mapState("Builder", {
    composition: (state) => state.composition,
  }),
  ...mapState("Cart", {
    pizzas: (state) => state.pizzas,
    misc: (state) => state.misc,
    address: (state) => state.address,
    recipient: (state) => state.recipient,
    phone: (state) => state.phone,
  }),
 */
