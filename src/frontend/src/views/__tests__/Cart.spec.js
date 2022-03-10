import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Cart from '@/views/Cart.vue';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

// Начало блока тестов
describe('Cart', () => {
    // Заглушка вместо реального router-view
    const stubs = ['router-view'];
  
    // Переменные, которые будут переопределяться заново для каждого теста
    let actions;
    let store;
    let wrapper;
    const createComponent = options => {
      wrapper = mount(Cart, options);
    };
  
    // Перед каждым тестом заменяем хранилище на новое,
    // а также его действия свежими jest-функциями.
    beforeEach(() => {
      actions = {
        Cart: {
        //   changeTotalPrice: jest.fn(),
        //   changeCounter: jest.fn(),
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
});


// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["resetBuilder"]),
  + ...mapActions("Cart", [
  +   "query",
  +   "createPizza",
  +   "updatePizza",
  + ]),

    ...mapActions("Auth", ["newAddresses"]),
    ...mapActions("Orders", ["newOrder"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
  }),
  ...mapState("Builder", {
    composition: (state) => state.composition,
  }),
  ...mapState("Cart", {
    pizzas: (state) => state.pizzas,
    misc: (state) => state.misc,
    address: (state) => state.address,
    recipient: (state) => state.recipient,
    phone: (state) => state.phone,
  }),
 */
