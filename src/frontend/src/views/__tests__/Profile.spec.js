import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/common/helpers";
// Импортируем сам компонент.
import Profile from "@/views/Profile";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

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

describe("Profile", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Auth: {
        queryAddresses: jest.fn(),
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
    authenticateUser(store);
    saveAddress(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент выводит имя пользователя
  it(`It renders the user's name`, () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="name"]');
    expect(name.text()).toBe("Вася Пупкин");
  });

  //проверяем, что компонент выводит телефон пользователя
  it(`It renders the user's phone`, () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    let phone = wrapper.find('[data-test="phone"]');
    expect(phone.text()).toBe("+777 777 777");
  });

  //проверяем, что компонент выводит список сохраненных адресов
  it(`It displays a list of saved addresses`, () => {
    authenticateUser(store);
    saveAddress(store);
    createComponent({ localVue, store });
    let addresses = wrapper.findAll('[data-test="address"]');
    expect(addresses.length).toBe(savedAddresses.length);
  });

  //проверяем, что компонент при клике по "Добавить новый адрес" показывает
  //форму добавления адреса
  it(`It when clicking on "Add new address" shows the form for adding an 
  address`, async () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    let btn = wrapper.find('[data-test="add"]');
    await btn.trigger("click");
    await wrapper.vm.$nextTick();
    let form = wrapper.find('[data-test="form"]');
    expect(form).not.toBeUndefined();
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Auth", ["queryAddresses"]),
  + :src="require(`@/assets/img/users/user5@2x.jpg`)"
  + :srcset="require(`@/assets/img/users/user5@4x.jpg`) + ' 4x'"
  + :alt="user.name"
  + {{ user.name }}
  + {{ user.phone }}
  + v-if="addresses"
  + @click="visibleForm = !visibleForm"
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
    addresses: (state) => state.addresses,
  }),
*/
