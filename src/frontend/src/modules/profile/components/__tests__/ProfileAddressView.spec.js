import { mount } from '@vue/test-utils';
// Импортируем сам компонент.
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

// Указываем название блока тестов — соответствует названию компонента.
describe('ProfileAddressView', () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    address: {
      building: "9",
      comment: "Какой-то еще адрес",
      flat: "8",
      id: 1,
      name: "Дом",
      street: "Хворостянского",
      userId: "52ac478b-7148-4f32-b391-bde858803121"
    },
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = mount(ProfileAddressView, options);
  };

  // Перед каждым тестом заменяем хранилище на новое,
  // а также его действия свежими jest-функциями.
  beforeEach(() => {
    // store = generateMockStore();
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент рендерится
  it ('is rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент выводит название адреса, если оно есть
  it('It displays the name of the address, if it exists', () => {
    createComponent({ propsData });
    let name = wrapper.find('[data-test="name"]');
    expect(name.text()).toBe(propsData.address.name);
    expect(wrapper.find('[data-test="name"] + b')).not.toBe();
  });

  //проверяем, что компонент выводит альтернативное название адреса
  it('It displays the name of the address, if it exists', () => {
    let propsData = {
      address: {
        building: "204",
        comment: "Домашний адрес",
        flat: "80",
        id: 1,
        name: "",
        street: "Дзержинского",
        userId: "52ac478b-7148-4f32-b391-bde858803121"
      },
    };
    createComponent({ propsData });
    let alternate = wrapper.find('[data-test="alternate"]');
    expect(alternate.text()).toBe(`Адрес №${propsData.address.id }.`);
  });

  //проверяем, что генерируется событие по клику на "Изменить"
  it('It emits an event on a click on "Change"', async () => {
    createComponent({ propsData });
    let put = wrapper.find('[data-test="put"]');
    await put.trigger('click');
    expect(wrapper.emitted().putAddress).toBeTruthy();
  });

  //проверяем, что компонент выводит комментарий при его наличии
  it('It displays a comment if there is one', () => {
    createComponent({ propsData });
    let comment = wrapper.find('[data-test="comment"]');
    expect(comment.text()).toBe(propsData.address.comment);
  });

  //проверяем, что компонент выводит адрес в ожидаемом виде
  it ('It renders the address as expected', () => {
    createComponent({ propsData });
    let address = wrapper.find('[data-test="street"]');
    expect(address.text()).toBe(
      `${propsData.address.street}, д. ${propsData.address.building}, кв. ${propsData.address.flat}`
    );
  });
});

// Список элементов для тестирования
/*
  + v-if="address.name"
  + {{ address.name }}
  + @click="putAddress"
  + {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
  + v-if="address.comment"
  + {{ address.comment }}
*/

// Данные из тест хранилища
/*
  ...
*/
