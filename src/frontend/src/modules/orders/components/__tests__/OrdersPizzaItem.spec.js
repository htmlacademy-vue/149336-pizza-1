// Карточка дополнительных товаров — это ... компонент. Монтируем её с помощью ... .
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { SET_ENTITY } from '@/store/mutation-types';
import { generateMockStore } from '@/store/mocks';
import { authenticateUser } from '@/common/helpers';
// Импортируем сам компонент.
import OrdersPizzaItem from "@/modules/orders/components/OrdersPizzaItem";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const doughs = [
  {
    id:1,
    name:"Тонкое",
    image:"/public/img/dough-light.svg",
    description:"Из твердых сортов пшеницы",
    price:300,
    type:"light",
    isChecked:true
  },
  {
    id:2,
    name:"Толстое",
    image:"/public/img/dough-large.svg",
    description:"Из твердых сортов пшеницы",
    price:300,
    type:"large",
    isChecked:false
  },
];

const getDough = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "doughs",
      value: doughs,
    },
  );
};

const ingredients = [
  {
    id:1,
    name:"Грибы",
    image:"/public/img/filling/mushrooms.svg",
    price:33,
    label:"mushrooms",
    count:0
  },
  {
    id:2,
    name:"Салями",
    image:"/public/img/filling/salami.svg",
    price:42,
    label:"salami",
    count:1
  },
  {
    id:3,
    name:"Чеддер",
    image:"/public/img/filling/cheddar.svg",
    price:42,
    label:"cheddar",
    count:0
  },
  {
    id:4,
    name:"Ветчина",
    image:"/public/img/filling/ham.svg",
    price:42,
    label:"ham",
    count:0
  },
  {
    id:5,
    name:"Маслины",
    image:"/public/img/filling/olives.svg",
    price:25,
    label:"olives",
    count:0
  },
  {
    id:6,
    name:"Халапеньо",
    image:"/public/img/filling/jalapeno.svg",
    price:25,
    label:"jalapeno",
    count:0
  },
  {
    id:7,
    name:"Чили",
    image:"/public/img/filling/chile.svg",
    price:21,
    label:"chile",
    count:0
  },
  {
    id:8,
    name:"Лук",
    image:"/public/img/filling/onion.svg",
    price:21,
    label:"onion",
    count:0
  },
  {
    id:9,
    name:"Бекон",
    image:"/public/img/filling/bacon.svg",
    price:42,
    label:"bacon",
    count:0
  },
  {
    id:10,
    name:"Томаты",
    image:"/public/img/filling/tomatoes.svg",
    price:35,
    label:"tomatoes",
    count:1
  },
  {
    id:11,
    name:"Ананас",
    image:"/public/img/filling/ananas.svg",
    price:25,
    label:"ananas",
    count:0
  },
  {
    id:12,
    name:"Лосось",
    image:"/public/img/filling/salmon.svg",
    price:50,
    label:"salmon",
    count:0
  },
  {
    id:13,
    name:"Моцарелла",
    image:"/public/img/filling/mozzarella.svg",
    price:35,
    label:"mozzarella",
    count:0
  },
  {
    id:14,
    name:"Пармезан",
    image:"/public/img/filling/parmesan.svg",
    price:35,
    label:"parmesan",
    count:0
  },
  {
    id:15,
    name:"Блю чиз",
    image:"/public/img/filling/blue_cheese.svg",
    price:50,
    label:"blue_cheese",
    count:0
  },
];

const getIngridients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredients,
    },
  );
};

const sauces = [
  {
    id:1,
    name:"Сливочный",
    price:50,
    value:"creamy",
    isChecked:false
  },
  {
    id:2,
    name:"Томатный",
    price:50,
    value:"tomato",
    isChecked:true
  },
];

const getSauces = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: sauces,
    },
  );
};

const sizes = [
  {
    id:3,
    name:"23 см",
    image:"/public/img/diameter.svg",
    multiplier:1,
    size:"small",
    isChecked:false
  },
  {
    id:2,
    name:"32 см",
    image:"/public/img/diameter.svg",
    multiplier:2,
    size:"normal",
    isChecked:true
  },
  {
    id:1,
    name:"45 см",
    image:"/public/img/diameter.svg",
    multiplier:3,
    size:"big",
    isChecked:false
  },
];

const getSizes = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizes,
    },
  );
};

// Указываем название блока тестов — соответствует названию компонента.
describe('OrdersPizzaItem', () => {
  // Заглушка вместо реального router-view
  const stubs = ['router-view'];
  
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    pizza: {
      doughId: 1,
      doughPrice: 300,
      id: 9,
      ingredients: [
        {
          id: 3,
          ingredientId: 2,
          pizzaId: 1,
          price: 42,
          quantity: 1,
        },
        {
          id: 4,
          ingredientId: 10,
          pizzaId: 1,
          price: 35,
          quantity: 1,
        },
      ],
      name: "любимая",
      orderId: 1,
      quantity: 1,
      sauceId: 1,
      saucePrice: 50,
      sizeId: 2,
      sizeMultiplier: 2,
      totalPricePizza: 854,
    }
  };
  
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(OrdersPizzaItem, options);
  };
  
  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {};
    store = generateMockStore(actions);
  });
  
  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });
  
  //проверяем, что компонент рендерится
  it ('is rendered', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент выводит значение атрибута alt в картинке
  it('It displays the value of the alt attribute in the image', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let alt = wrapper.find('[data-test="alt"]');
    expect(alt.attributes('alt')).toBe(propsData.pizza.name);
  });

  //проверяем, что компонент выводит название товара
  it('It displays the product name', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let name = wrapper.find('[data-test="name"]');
    expect(name.text()).toBe(propsData.pizza.name);
  });

  //проверяем, что компонент выводит строку с размером пиццы и толщиной теста
  it('It outputs a string with the size of the pizza and the thickness of the dough', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let dough = wrapper.find('[data-test="doughSizeText"]');
    expect(dough.text()).toBe('32 см, на тонком тесте');
  });

  //проверяем, что компонент выводит строку с названием соуса
  it('It outputs a string with the name of the sauce', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let sauce = wrapper.find('[data-test="sauceText"]');
    expect(sauce.text()).toBe('Соус: сливочный');
  });

  //проверяем, что компонент выводит строку с перечислением ингридиентов
  it('It outputs a string listing the ingredients', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let ingredients = wrapper.find('[data-test="ingridientsText"]');
    expect(ingredients.text()).toBe('Начинка: салями, томаты');
  });

  //проверяем, что компонент выводит цену товара
  it('It displays the product price', () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    createComponent({ localVue, store, stubs, propsData });
    let price = wrapper.find('[data-test="price"]');
    expect(price.text()).toContain(`${propsData.pizza.totalPricePizza} ₽`);
  });

  //проверяем, что компонент выводит цену * кол-во товара если количество более 1
  it('It displays the price * quantity of goods if the quantity is more than 1', async () => {
    authenticateUser(store);
    getSizes(store);
    getDough(store);
    getIngridients(store);
    getSauces(store);
    let propsData = {
      pizza: {
        doughId: 1,
        doughPrice: 300,
        id: 9,
        ingredients: [
          {
            id: 3,
            ingredientId: 3,
            pizzaId: 1,
            price: 42,
            quantity: 1,
          },
          {
            id: 4,
            ingredientId: 4,
            pizzaId: 1,
            price: 35,
            quantity: 1,
          },
        ],
        name: "любимая",
        orderId: 1,
        quantity: 2,
        sauceId: 1,
        saucePrice: 50,
        sizeId: 2,
        sizeMultiplier: 2,
        totalPricePizza: 854,
      }
    };
    createComponent({ localVue, store, stubs, propsData });
    let quantity = wrapper.find('[data-test="quantity"]');
    expect(quantity.text()).toContain(`${propsData.pizza.quantity} х ${propsData.pizza.totalPricePizza} ₽`);
  });
});

// Список элементов для тестирования
/*
  + v-if="pizza.quantity > 1"
  + v-else
*/

// Данные из тест хранилища
/*
  ...mapState("Orders", ["orders"]),
  ...mapState("Builder", ["ingredients", "sauces", "sizes", "doughs"]),
*/
