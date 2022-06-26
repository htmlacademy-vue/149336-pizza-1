import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { SET_ENTITY, CHANGE_SAUCE } from '@/store/mutation-types';
import { generateMockStore } from '@/store/mocks';
// Импортируем сам компонент.
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const ingridients = [
  {
    id: 1,
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
    label: "mushrooms",
    count: 0
  },
  {
    id: 2,
    name: "Чеддер",
    image: "/public/img/filling/cheddar.svg",
    price: 42,
    label: "cheddar",
    count: 0
  },
  {
    id: 3,
    name: "Салями",
    image: "/public/img/filling/salami.svg",
    price: 42,
    label: "salami",
    count: 0
  },
  {
    id: 4,
    name: "Томаты",
    image: "/public/img/filling/tomatoes.svg",
    price: 35,
    label: "tomatoes",
    count: 0
  },
  {
    id: 5,
    name: "Лосось",
    image: "/public/img/filling/salmon.svg",
    price: 50,
    label: "salmon",
    count: 0
  },
  {
    id: 6,
    name: "Моцарелла",
    image: "/public/img/filling/mozzarella.svg",
    price: 35,
    label: "mozzarella",
    count: 0
  },
  {
    id: 7,
    name: "Чили",
    image: "/public/img/filling/chile.svg",
    price: 21,
    label: "chile",
    count: 0
  },
  {
    id: 8,
    name: "Ананас",
    image: "/public/img/filling/ananas.svg",
    price: 25,
    label: "ananas",
    count: 0
  },
  {
    id: 9,
    name: "Бекон",
    image: "/public/img/filling/bacon.svg",
    price: 42,
    label: "bacon",
    count: 0
  },
  {
    id: 10,
    name: "Ветчина",
    image: "/public/img/filling/ham.svg",
    price: 42,
    label: "ham",
    count: 0
  },
  {
    id: 11,
    name: "Пармезан",
    image: "/public/img/filling/parmesan.svg",
    price: 35,
    label: "parmesan",
    count: 0
  },
  {
    id: 12,
    name: "Блю чиз",
    image: "/public/img/filling/blue_cheese.svg",
    price: 50,
    label: "blue_cheese",
    count: 0
  },
  {
    id: 13,
    name: "Лук",
    image: "/public/img/filling/onion.svg",
    price: 21,
    label: "onion",
    count: 0
  },
  {
    id: 14,
    name: "Маслины",
    image: "/public/img/filling/olives.svg",
    price: 25,
    label: "olives",
    count: 0
  },
  {
    id: 15,
    name: "Халапеньо",
    image: "/public/img/filling/jalapeno.svg",
    price: 25,
    label: "jalapeno",
    count: 0
  }
];

const getIngridients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingridients,
    },
  );
};

const sauces = [
  {
    id: 1,
    name: "Сливочный",
    price: 50,
    value: "creamy",
    isChecked: false
  },
  {
    id: 2,
    name: "Томатный",
    price: 50,
    value: "tomato",
    isChecked: true
  }
];

const getSouces = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: sauces,
    },
  );
};

const sauce = "creamy";

const setSauce = (store) => {
  store.commit(
    "Builder/" + CHANGE_SAUCE,
    {
      value: sauce,
    },
  );
};

// Указываем название блока тестов — соответствует названию компонента.
describe('BuilderIngredientsSelector', () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        changeSauce: jest.fn(),
        changeCounter: jest.fn(),
        switchClassPizza: jest.fn(),
      }
    };
    store = generateMockStore(actions);
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it ('is rendered', () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент вызывает экшн переключения соуса changeSauce
  it ('it calls the sauce switch action changeSauce', async () => {
    getSouces(store);
    setSauce(store);
    getIngridients(store);
    createComponent({ localVue, store });
    let newSauce = wrapper.find('[data-test="sauce"]:nth-of-type(2)');
    await newSauce.trigger('click');
    expect(actions.Builder.changeSauce).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        price: 50,
        value: "tomato",
      }
    );
  });

  //проверяем, что компонент вызывает экшн переключения класса изображения 
  //switchClassPizza
  it ('it calls the image class switching action switchClassPizza', 
  async () => {
    getSouces(store);
    setSauce(store);
    getIngridients(store);
    createComponent({ localVue, store });
    let newSauce = wrapper.find('[data-test="sauce"]:nth-of-type(2)');
    await newSauce.trigger('click');
    expect(actions.Builder.switchClassPizza).toHaveBeenCalled();
  });

  //проверяем, что компонент вызывает экшн переключения счетчика changeCounter
  it ('it calls the image class switching action changeCounter',
  async () => {
    getSouces(store);
    setSauce(store);
    getIngridients(store);
    createComponent({ localVue, store });
    let counter = wrapper.find('[data-test="counter"] .counter__button--plus');
    await counter.trigger('click');
    expect(actions.Builder.changeCounter).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        id: 1,
        newCount: 1,
      }
    );
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", [
  +     "changeSauce",
  +     "changeCounter",
  +     "switchClassPizza",
  + ]),
*/

// Данные из тест-хранилища
/*
  + ...mapState("Builder", {
  +     ingridients: (state) => state.ingredients,
  +     sauces: (state) => state.sauces,
  +     sauce: (state) => state.composition.sauce.value,
  + }),
*/