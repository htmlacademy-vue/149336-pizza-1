// Нотификация — это глупый компонент. Монтируем её с помощью shallowMount.
import { shallowMount } from '@vue/test-utils';
// Импортируем сам компонент.
import AppNotifications from '@/common/components/AppNotifications';

// Указываем название блока тестов — соответствует названию компонента.
describe('AppNotifications', () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const mocks = {
    $store: {
      state: {
        notifications: []
      }
    }
  };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = shallowMount(AppNotifications, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
    wrapper = null;
  });

  //проверяем, что компонент не отображается, когда нет уведомлений
  it('doesn\'t render out when no notifications', () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  //проверяем, что компонент рендерится, когда у нас есть уведомления
  it('renders out when we have notifications', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
  });

  //проверяем, что компонент выдает уведомление
  it('renders out notification', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    createComponent({ mocks });
    expect(wrapper.html()).toContain('notification--warning');
    expect(wrapper.html()).toContain('text');
  });
});

  // Список элементов для тестирования
/*
  + v-for="({ text, type }, i) in notifications"
  + :key="i"
  + :class="`notification notification--${type}`"
*/

// Данные из тест-хранилища
/*
  + ...mapState(["notifications"]),
*/