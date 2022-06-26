import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import { authenticateUser } from '@/common/helpers';
// Импортируем сам компонент.
import Popup from "@/views/Popup";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn()
  },
};

describe('Popup', () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let actions;
  let store;
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(Popup, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    actions = {
      Builder: {
        resetBuilder: jest.fn(),
      },
      Cart: {
        resetPizzas: jest.fn(),
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
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент вызывает экшены resetBuilder&resetPizzas
  //при закрытии попапа
  it (`It calls the resetBuilder resetPizzas actions when the popup
  closes`, async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs: { transition:false } });
    let close = wrapper.find('[data-test="close"]');
    await close.trigger('click');
    await close.trigger('animationend');
    expect(actions.Builder.resetBuilder).toHaveBeenCalled();
    expect(actions.Cart.resetPizzas).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + ...mapActions("Builder", ["resetBuilder"]),
  + ...mapActions("Cart", ["resetPizzas"]),
*/

// Данные из тест хранилища
/*
  ...mapState("Auth", {
    user: (state) => state.user,
  }),
*/