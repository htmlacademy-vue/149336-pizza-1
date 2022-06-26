import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import {
  UPDATE_RECIPIENT,
  SET_ENTITY,
  UPDATE_USER_ADDRESS
} from '@/store/mutation-types';
import { generateMockStore } from '@/store/mocks';
// Импортируем сам компонент.
import CartForm from "@/modules/cart/components/CartForm";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const recipient = {
  recipient: "myself",
};

const selectMyself = store => {
  store.commit(
    "Cart/" + UPDATE_RECIPIENT,
    {
      data: recipient,
    }
  );
};

const recipientNew = {
  recipient: "new",
};

const selectNewAddress = store => {
  store.commit(
    "Cart/" + UPDATE_RECIPIENT,
    {
      data: recipientNew,
    }
  );
};

const recipientSaved = {
  recipient: "1",
};

const selectSavedAddress = store => {
  store.commit(
    "Cart/" + UPDATE_RECIPIENT,
    {
      data: recipientSaved,
    }
  );
};

const savedAddresses = [
  {
    building:"204",
    comment:"Предпочтительный адрес",
    flat:"70",
    id:1,
    name:"Дом",
    street:"Дзержинского",
    userId:"a2283d8a-142d-424b-bd84-cfc9bfbf9f43",
  },
];

const saveAddress = store => {  
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "addresses",
      value: savedAddresses,
    }
  );
};

const newAddress = {
  street:"Хворостянского",
  house:"9",
  apartment:"8",
};

const updateAddress = (store) => {
  store.commit(
    "Cart/" + UPDATE_USER_ADDRESS,
    {
      data: newAddress,
    }
  );
};

// Указываем название блока тестов — соответствует названию компонента.
describe('CartForm', () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(CartForm, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Cart: {
        updateUserAddress: jest.fn(),
        updateUserRecipient: jest.fn(),
        resetUserAddress: jest.fn(),
        updatePhone: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент устанавливает начальное значение модели
  it ('It sets the initial model value', () => {
    selectMyself(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.find('[data-test="recipient"]').element.value).toBe('myself');
  });

  //проверяем, что компонент устанавливает значение value для option
  it ('It sets the value of the option', () => {
    saveAddress(store);
    updateAddress(store);
    createComponent({ localVue, store, propsData });
    let saved = wrapper.find('[data-test="recipient"] option[value="1"]');
    expect(saved.element.value).toBe('1');
  });

  //проверяем, что поля ввода адреса имеют атрибут disabled при выборе 
  //сохраненного адреса
  it (`Address input fields have a disabled attribute when selecting a saved 
  address`, () => {
    saveAddress(store);
    selectSavedAddress(store);
    createComponent({ localVue, store, propsData });
    let fieldStreet = wrapper.find('[data-test="street"] input');
    let fieldHouse = wrapper.find('[data-test="house"] input');
    let fieldFlat = wrapper.find('[data-test="apartment"] input');
    expect(fieldStreet.attributes('disabled')).toBe('disabled');
    expect(fieldHouse.attributes('disabled')).toBe('disabled');
    expect(fieldFlat.attributes('disabled')).toBe('disabled');
  });

  //проверяем, что поля ввода адреса не имеют атрибут disabled при выборе
  //нового адреса
  it (`Address input fields do not have a disabled attribute when selecting a
  new address`, () => {
    saveAddress(store);
    selectNewAddress(store);
    createComponent({ localVue, store, propsData });
    let fieldStreet = wrapper.find('[data-test="street"] input');
    let fieldHouse = wrapper.find('[data-test="house"] input');
    let fieldFlat = wrapper.find('[data-test="apartment"] input');
    expect(fieldStreet.attributes('disabled')).not.toBe('disabled');
    expect(fieldHouse.attributes('disabled')).not.toBe('disabled');
    expect(fieldFlat.attributes('disabled')).not.toBe('disabled');
  });

  //проверяем, что компонент в зависимости от значения recipientOrder
  //показывает/прячет форму ввода адреса
  it (`It, depending on the value of recipientOrder, shows/hides the address
  entry form`, () => {
    saveAddress(store);
    selectNewAddress(store);
    updateAddress(store);
    createComponent({ localVue, store, propsData });
    let form = wrapper.find('[data-test="address"]');
    expect(form).not.toBeNull();
  });
  
  //проверяем, что компонент устанавливает значение модели streetAddress
  it ('It sets the value of the streetAddress model', () => {
    saveAddress(store);
    selectNewAddress(store);
    updateAddress(store);
    createComponent({ localVue, store, propsData });
    let street = wrapper.find('[data-test="street"] input');
    expect(street.element.value).toBe(newAddress.street);
  });

  //проверяем, что компонент устанавливает значение модели houseAddress
  it ('It sets the value of the houseAddress model', () => {
    saveAddress(store);
    selectNewAddress(store);
    updateAddress(store);
    createComponent({ localVue, store, propsData });
    let house = wrapper.find('[data-test="house"] input');
    expect(house.element.value).toBe(newAddress.house);
  });

  //проверяем, что компонент устанавливает значение модели apartmentAddress
  it ('It sets the value of the apartmentAddress model', () => {
    saveAddress(store);
    selectNewAddress(store);
    updateAddress(store);
    createComponent({ localVue, store, propsData });
    let apartment = wrapper.find('[data-test="apartment"] input');
    expect(apartment.element.value).toBe(newAddress.apartment);
  });

  //проверяем, что компонент вызывает экшн обновления телефона
  it ('It calls the phone change action', async () => {
    selectMyself(store);
    createComponent({ localVue, store, propsData });
    let input = wrapper.find('[data-test="phone"] input');
    input.element.value = '+7 918 436-22-02';
    await input.trigger('input');
    expect(actions.Cart.updatePhone).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        phone: '+7 918 436-22-02'
      }
    );
  });

  //проверяем, что компонент вызывает экшн сброса адреса доставки
  it ('It calls the reset address action', async () => {
    saveAddress(store);
    selectSavedAddress(store);
    createComponent({ localVue, store, propsData });
    let select = wrapper.find('[data-test="recipient"]');
    const options = select.findAll('option');
    await options.at(0).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('myself'); 
    expect(actions.Cart.resetUserAddress).toHaveBeenCalled();
    await options.at(2).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('1'); 
    await options.at(1).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('new'); 
    expect(actions.Cart.resetUserAddress).toHaveBeenCalled();
  });

  //проверяем, что при смене способа получения заказа отрабатывает экшн 
  //updateUserAddress
  it (`When changing the method of receiving an order, it executes the 
  updateUserAddress action`, async () => {
    saveAddress(store);
    selectNewAddress(store);
    createComponent({ localVue, store, propsData });
    let street = wrapper.find('[data-test="street"] input');
    street.element.value = 'Гостагаевская';
    await street.trigger('input');
    expect(actions.Cart.updateUserAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        street: 'Гостагаевская',
      }
    );
  });

  //проверяем, что при смене способа получения заказа отрабатывает экшн 
  //updateUserRecipient
  it (`When changing the method of receiving an order, it executes the 
  updateUserRecipient action`, async () => {
    saveAddress(store);
    selectNewAddress(store);
    createComponent({ localVue, store, propsData });
    let select = wrapper.find('[data-test="recipient"]');
    const options = select.findAll('option');
    await options.at(0).setSelected();
    expect(actions.Cart.updateUserRecipient).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        recipient: 'myself',
      }
    );
  });
});

// Список элементов для тестирования
/*
  + v-model="recipientOrder"
  + :value="address.id"
  + {{ address.comment || `Адрес ${index + 1}` }}
  + v-if="recipientOrder === 'myself'"
  + v-model="phoneUser"
  + :errorText="errors[0]"
  + v-if="recipientOrder !== 'myself'"
  + v-if="recipientOrder == 'new'"
  + v-if="recipientOrder !== 'myself' && recipientOrder !== 'new'"
  + v-if="recipientOrder === 'new'"
  + v-model="streetAddress"
  + :disabled="savedAddress"
  + v-model="houseAddress"
  + :disabled="savedAddress"
  + v-model="apartmentAddress"
  + :disabled="savedAddress"
  + ...mapActions("Cart", [
      "updateUserAddress",
      "updateUserRecipient",
      "resetUserAddress",
      "updatePhone",
    ]),
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
    addresses: (state) => state.addresses,
  }),
  ...mapState("Cart", {
    recipient: (state) => state.recipient,
    phone: (state) => state.phone,
    address: (state) => state.address,
  }),
 */
