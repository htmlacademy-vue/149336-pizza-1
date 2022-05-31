// Карточка дополнительных товаров — это ... компонент. Монтируем её с помощью ... .
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { SET_ENTITY } from '@/store/mutation-types';
import { generateMockStore } from '@/store/mocks';
import { authenticateUser } from '@/common/helpers';
// Импортируем сам компонент.
import OrdersItem from "@/modules/orders/components/OrdersItem";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn()
  },
};

const orders = [
  {
    addressId:1,
    id:1,
    orderAddress:{
      id:1,
      name:"ул.Хворостянского, д.9, кв.8",
      street:"Хворостянского",
      building:"9",
      flat:"8",
      comment:"",
      userId:"52ac478b-7148-4f32-b391-bde858803121"
    },
    orderMisc:[
      {
        id:1,
        quantity:2,
        orderId:1,
        miscId:1,
        price:56
      },
      {
        id:2,
        quantity:1,
        orderId:1,
        miscId:3,
        price:10
      }
    ],
    orderPizzas:[
      {
        id:1,
        name:"любимая",
        quantity:1,
        sauceId:1,
        doughId:1,
        sizeId:3,
        orderId:1,
        ingredients:[
          {
            id:3,
            ingredientId:3,
            pizzaId:1,
            quantity:1,
            price:42
          },
          {
            id:4,
            ingredientId:4,
            pizzaId:1,
            quantity:1,
            price:35
          }
        ],
        doughPrice:300,
        sizeMultiplier:2,
        saucePrice:50,
        totalPricePizza:854
      }
    ],
    userId:"52ac478b-7148-4f32-b391-bde858803121"
  }
];

const getOrders = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Orders",
      entity: "orders",
      value: orders,
    },
  );
}

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
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "misc",
      value: misc,
    },
  );
};


// Указываем название блока тестов — соответствует названию компонента.
describe('OrdersItem', () => {    
    // Переменные, которые будут переопределяться заново для каждого теста
    let actions;
    let store;
    let wrapper;
    // Определяем входные параметры по умолчанию и заглушки.
    const propsData = {
      order: {
        addressId:1,
        id:1,
        orderAddress:{
          id:1,
          name:"ул.Хворостянского, д.9, кв.8",
          street:"Хворостянского",
          building:"9",
          flat:"8",
          comment:"",
          userId:"52ac478b-7148-4f32-b391-bde858803121"
        },
        orderMisc:[
          {
            id:1,
            quantity:2,
            orderId:1,
            miscId:1,
            price:56
          },
          {
            id:2,
            quantity:1,
            orderId:1,
            miscId:3,
            price:10
          }
        ],
        orderPizzas:[
          {
            id:1,
            name:"любимая",
            quantity:1,
            sauceId:1,
            doughId:1,
            sizeId:3,
            orderId:1,
            ingredients:[
              {
                id:3,
                ingredientId:3,
                pizzaId:1,
                quantity:1,
                price:42
              },
              {
                id:4,
                ingredientId:4,
                pizzaId:1,
                quantity:1,
                price:35
              }
            ],
            doughPrice:300,
            sizeMultiplier:2,
            saucePrice:50,
            totalPricePizza:854
          }
        ],
        userId:"52ac478b-7148-4f32-b391-bde858803121"
      },
    };
      
    // Для каждого теста мы будем создавать новую обёртку.
    const createComponent = options => {
      wrapper = mount(OrdersItem, options);
    };
      
    // Перед каждым тестом заменяем хранилище на новое,
    // а также его действия свежими jest-функциями.
    beforeEach(() => {
      actions = {
        Orders: {
          deleteOrder: jest.fn(),
        },
        Cart: {
          repeatPizza: jest.fn(),
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
      authenticateUser(store);
      getSizes(store);
      getDough(store);
      getIngridients(store);
      getSauces(store);
      getMiscs(store);
      getOrders(store);
      createComponent({ localVue, store, propsData });
      expect(wrapper.exists()).toBeTruthy();
    });

    //проверяем корректность вызова экшена deleteOrder (удаление заказа)
    it ('Check the correctness of calling the deleteOrder action', async () => {
      authenticateUser(store);
      getSizes(store);
      getDough(store);
      getIngridients(store);
      getSauces(store);
      getMiscs(store);
      getOrders(store);
      createComponent({ localVue, store, propsData, mocks });
      let delBtn = wrapper.find('[data-test="delete"]:first-of-type');
      await delBtn.trigger('click');
      expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
        expect.any(Object), // The Vuex context
        {
          ...propsData.order
        }
      );
    });
    
    //проверяем корректность вызова экшена repeatPizza (повтор заказа)
    it ('Check the correctness of calling the repeatPizza action', async () => {
      authenticateUser(store);
      getSizes(store);
      getDough(store);
      getIngridients(store);
      getSauces(store);
      getMiscs(store);
      getOrders(store);
      createComponent({ localVue, store, propsData, mocks });
      let repeatBtn = wrapper.find('[data-test="repeat"]:first-of-type');
      await repeatBtn.trigger('click');
      expect(actions.Cart.repeatPizza).toHaveBeenCalledWith(
        expect.any(Object), // The Vuex context
        {
          ...propsData.order
        }
      );
    });
});

// Список элементов для тестирования
/*
  + ...mapActions("Orders", ["deleteOrder"]),
  + ...mapActions("Cart", ["repeatPizza"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Orders", ["orders"])
*/