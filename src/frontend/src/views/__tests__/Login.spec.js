import { mount, createLocalVue } from '@vue/test-utils';
import Login from '@/views/Login';
import AppInput from '@/common/components/AppInput';

const localVue = createLocalVue();
localVue.component('AppInput', AppInput);

describe('Login', () => {
  let routerPush;
  let dispatch;
  let login;

  const methods = {
    login
  };

  const mocks = {
    $router: {
      push: routerPush
    },
    $store: {
      dispatch
    },
  };

  const stubs = [
    'router-link'
  ];

  let wrapper;
  const createComponent = options => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('redirects to index on close button click', async () => {
    createComponent({ localVue, mocks, stubs });
    const closeBtn = wrapper.find('.close');
    await closeBtn.trigger('click');
    expect(routerPush).toHaveBeenCalledWith('/');
  });

});

// Список элементов для тестирования
/*
  + @submit.prevent="login"
  + :errorText="errors[0]"
  + :disabled="invalid"
*/

// Данные из тест хранилища
/*
  
 */
