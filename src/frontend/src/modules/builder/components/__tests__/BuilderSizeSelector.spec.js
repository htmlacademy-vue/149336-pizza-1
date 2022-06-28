import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { SET_ENTITY, CHANGE_SIZE } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
// Импортируем сам компонент.
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const sizes = [
  {
    id: 2,
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
    size: "small",
    isChecked: false,
  },
  {
    id: 3,
    name: "32 см",
    image: "/public/img/diameter.svg",
    multiplier: 2,
    size: "normal",
    isChecked: true,
  },
  {
    id: 1,
    name: "45 см",
    image: "/public/img/diameter.svg",
    multiplier: 3,
    size: "big",
    isChecked: false,
  },
];

const getSizes = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "sizes",
    value: sizes,
  });
};

const size = "normal";

const setSize = (store) => {
  store.commit("Builder/" + CHANGE_SIZE, {
    value: size,
  });
};

// Указываем название блока тестов — соответствует названию компонента.
describe("BuilderSizeSelector", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        changeSize: jest.fn(),
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
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что в компоненте выводится правильное количество размеров
  //пиццы
  it("The correct number of pizza sizes is displayed in the component", () => {
    getSizes(store);
    setSize(store);
    createComponent({ localVue, store });
    let sizes = wrapper.findAll('[data-test="size"]');
    expect(sizes.length).toBe(sizes.length);
  });

  //проверяем, что компонент вызывает экшн переключения размера changeSize
  it("it calls the size switch action changeSize", async () => {
    getSizes(store);
    setSize(store);
    createComponent({ localVue, store });
    let newSize = wrapper.find('[data-test="size"]:nth-of-type(1)');
    await newSize.trigger("click");
    expect(actions.Builder.changeSize).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        value: "small",
      }
    );
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["changeSize"]),
*/

// Данные из тест-хранилища
/*
  + ...mapState("Builder", {
  +     sizes: (state) => state.sizes,
  +     size: (state) => state.composition.size.value,
  +   }),
*/
