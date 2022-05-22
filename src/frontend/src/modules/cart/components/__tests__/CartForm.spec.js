// Карточка дополнительных товаров — это ... компонент. Монтируем её с помощью ... .
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
// Импортируем сам компонент.
import CartForm from "@/modules/cart/components/CartForm";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

// Указываем название блока тестов — соответствует названию компонента.
describe('CartForm', () => {
  // Заглушка вместо реального router-view
  const stubs = ['router-view'];

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
            id:2,
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
            }
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
  const createComponent = options => {
    wrapper = mount(CartForm, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
        Auth: {
            changeUserPhone: jest.fn(),
        },
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
    createComponent({ localVue, store, stubs, propsData });
    expect(wrapper.exists()).toBeTruthy();
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
  + ...mapActions("Auth", ["changeUserPhone"]),
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
