// Карточка дополнительных товаров — это ... компонент. Монтируем её с помощью ... .
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { SET_ENTITY } from '@/store/mutation-types';
import { generateMockStore } from '@/store/mocks';
// Импортируем сам компонент.
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const dough = "light";

const setDough = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "dough",
      value: dough,
    },
  );
};

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

// Указываем название блока тестов — соответствует названию компонента.
describe('BuilderDoughSelector', () => {
  // Заглушка вместо реального router-view
  const stubs = ['router-view'];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(BuilderDoughSelector, options);
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
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что
  it ('...', () => {
    setDough(store);
    getDough(store);
    console.log(store.state.Builder.doughs[0].isChecked);
    createComponent({ localVue, store, stubs });
    console.log(wrapper.html());
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["changeDough", "switchClassPizza"]),
  + :value="item.type"
  + v-model="checkedDough"
  + :classRadioBtn="`dough__input dough__input--${item.type}`"
  + :classRadioInput="`visually-hidden`"
*/

// Данные из тест-хранилища
/*
  + ...mapState("Builder", {
  + doughs: (state) => state.doughs,
  + dough: (state) => state.composition.dough.value,
  + }),
*/