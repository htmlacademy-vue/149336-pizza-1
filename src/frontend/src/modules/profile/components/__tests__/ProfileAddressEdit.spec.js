import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import { authenticateUser } from "@/common/helpers";
import { generateMockStore } from "@/store/mocks";
import AppInput from "@/common/components/AppInput";
import flushPromises from "flush-promises";
// Импортируем сам компонент.
import ProfileAddressEdit from "@/modules/profile/components/ProfileAddressEdit";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);
// Добавляем в него Vuex.
localVue.use(Vuex);

const savedAddresses = [
  {
    building: "9",
    comment: "Какой-то еще адрес",
    flat: "8",
    id: 1,
    name: "Дом",
    street: "Хворостянского",
    userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
  },
];

const saveAddress = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "addresses",
    value: savedAddresses,
  });
};

// Указываем название блока тестов — соответствует названию компонента.
describe("ProfileAddressEdit", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    adr: {
      building: "9",
      comment: "Какой-то еще адрес",
      flat: "8",
      id: 1,
      name: "Дом",
      street: "Хворостянского",
      userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
    },
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressEdit, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Auth: {
        newAddresses: jest.fn(),
        deleteAddress: jest.fn(),
        updateAddresses: jest.fn(),
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

  //проверяем, что компонент устанавливает начальные значения моделей
  it("It sets the initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find('[data-test="name"] input').element.value).toBe(
      propsData.adr.name
    );
    expect(wrapper.find('[data-test="street"] input').element.value).toBe(
      propsData.adr.street
    );
    expect(wrapper.find('[data-test="house"] input').element.value).toBe(
      propsData.adr.building
    );
    expect(wrapper.find('[data-test="flat"] input').element.value).toBe(
      propsData.adr.flat
    );
    expect(wrapper.find('[data-test="comment"] input').element.value).toBe(
      propsData.adr.comment
    );
  });

  //проверяем, что компонент добавляет атрибут disabled кнопке отправки
  //некорректно заполненной формы
  it(`It adds the disabled attribute to the submit button of the incorrectly
  completed form`, async () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="name"] input');
    name.setValue("Дом2");
    await wrapper.vm.$nextTick();
    await name.trigger("input");
    let street = wrapper.find('[data-test="street"] input');
    street.setValue("Хворостянского");
    await wrapper.vm.$nextTick();
    await street.trigger("input");
    let flat = wrapper.find('[data-test="flat"] input');
    flat.setValue("8");
    await wrapper.vm.$nextTick();
    await flat.trigger("input");
    let submit = wrapper.find('[data-test="save"]');
    await flushPromises();
    expect(submit.attributes().disabled).toBeUndefined();
  });

  //проверяем, что компонент вызывает экшн создания адреса newAddrresses
  it("It calls the address creation action newAddrresses", async () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="name"] input');
    name.element.value = "Мой новый адрес";
    await name.trigger("input");
    let street = wrapper.find('[data-test="street"] input');
    street.element.value = "Куникова";
    await street.trigger("input");
    let house = wrapper.find('[data-test="house"] input');
    house.element.value = "92";
    await house.trigger("input");
    let flat = wrapper.find('[data-test="flat"] input');
    flat.element.value = "8";
    await flat.trigger("input");
    let form = wrapper.find('[data-test="form"]');
    await form.trigger("submit");
    expect(actions.Auth.newAddresses).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        building: "92",
        comment: "",
        flat: "8",
        name: "Мой новый адрес",
        street: "Куникова",
        userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
      }
    );
  });

  //проверяем, что компонент вызывает экшн удаления адреса deleteAddress
  it("deleteAddress", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    let delBtn = wrapper.find('[data-test="delete"]');
    await delBtn.trigger("click");
    expect(actions.Auth.deleteAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        building: "9",
        comment: "Какой-то еще адрес",
        flat: "8",
        id: 1,
        name: "Дом",
        street: "Хворостянского",
        userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
      }
    );
  });

  //проверяем, что компонент вызывает экшн удаления адреса updateAddresses
  it("updateAddresses", async () => {
    authenticateUser(store);
    saveAddress(store);
    createComponent({ localVue, store, propsData });
    let name = wrapper.find('[data-test="name"] input');
    name.element.value = "Обновленный адрес";
    await name.trigger("input");
    let form = wrapper.find('[data-test="form"]');
    await form.trigger("submit");
    expect(actions.Auth.updateAddresses).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        building: "9",
        comment: "Какой-то еще адрес",
        flat: "8",
        id: 1,
        name: "Обновленный адрес",
        street: "Хворостянского",
        userId: "5492bfcb-a8a5-4a83-902e-6d3ab66b9f98",
      }
    );
  });
});

// Список элементов для тестирования
/*
  + @submit.prevent="updateAddress"
  + v-if="addrId"
  + v-else
  + v-model="addrName"
  + v-model="addrStreet"
  + v-model="addrHouse"
  + v-model="addrApartment"
  + v-model="addrComment"
  +  :disabled="invalid"
  + ...mapActions("Auth", ["newAddrresses", "deleteAddress", "updateAddresses"]),
  + @click="delAddress"
  + @click="$emit('changeVisibleForm')"
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
    addresses: (state) => state.addresses,
  }),
*/
