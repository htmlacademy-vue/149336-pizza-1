import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
// import { SET_ENTITY } from '@/store/mutations-types';
// import user from '@/static/user';
import Index from '@/views/Index.vue';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
// const authenticateUser = store => {
//   store.commit(SET_ENTITY, {
//     module: 'Auth',
//     entity: 'user',
//     value: user[0]
//   });
//   store.commit(SET_ENTITY, {
//     module: 'Auth',
//     entity: 'isAuthenticated',
//     value: true
//   });
// };

// Начало блока тестов
describe('Index', () => {
  // Заглушка вместо реального router-view
  const stubs = ['router-view'];

  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Index, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        changeTotalPrice: jest.fn(),
        changeCounter: jest.fn(),
      }
    };
    store = generateMockStore(actions);
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('calls changeTotalPrice action', () => {
    createComponent({ localVue, store, stubs });
    const columnHtml = wrapper.find('[data-test="changeTotalPrice"]');
    columnHtml.vm.$emit('drop', {});
    expect(actions.Builder.changeTotalPrice).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {}
    );
  });
});


// Список элементов для тестирования
/*
  + @drop="moveIngridient($event)"
  + @drop="moveIngridient"
  + ...mapActions("Builder", ["changeTotalPrice", "changeCounter"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Builder", ["composition"]),
 */
