import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import Index from "@/views/Index.vue";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

// Начало блока тестов
describe("Index", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        changeCounter: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls changeCounter action", () => {
    createComponent({ localVue, store, stubs });
    const ingredients = wrapper.findComponent('[data-test="changeCounter"]');
    ingredients.vm.$emit("drop", { id: 1, count: 0 });
    expect(actions.Builder.changeCounter).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { id: 1, newCount: 1 }
    );
  });
});

// Список элементов для тестирования
/*
  + @drop="moveIngridient($event)"
  + @drop="moveIngridient"
  + ...mapActions("Builder", ["changeCounter"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Builder", ["composition"]),
  ...mapGetters({
    getTotalPrice: "Builder/getTotalPrice",
  }),
 */
