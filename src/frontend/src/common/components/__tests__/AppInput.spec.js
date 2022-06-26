// Поле ввода (input) — это глупый компонент. Монтируем её с помощью shallowMount.
import { shallowMount } from '@vue/test-utils';
// Импортируем сам компонент.
import AppInput from '@/common/components/AppInput';
// Указываем название блока тестов — соответствует названию компонента.
describe('AppInput', () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const errorClass = 'text-field__input--error';
  const propsData = {
    value: 'testValue',
    name: 'testName',
    type: 'text',
    placeholder: 'Test',
    errorText: 'Error',
    required: true
  };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = shallowMount(AppInput, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент устанавливает начальное значение модели
  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  //проверяем, что компонент генерирует событие при вводе
  it('It emits an input event when typing', async () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    await input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  //проверяем, что компонент выдает текущее входное значение при вводе
  it('emits the current input value when typing', async () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.element.value = 'test';
    await input.trigger('input');
    expect(wrapper.emitted().input[0][0]).toEqual('test');
  });

  //проверяем, что имя поля ввода - имя prop 
  it('input name is prop name', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('name')).toBe(propsData.name);
  });

  //проверяем, что тип поля ввода - тип prop
  it('input type is prop type', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('type')).toBe(propsData.type);
  });

  //проверяем, что плейсхолдер поля ввода - это плейсхолдер prop
  it('input placeholder is prop placeholder', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(propsData.placeholder);
  });

  //проверяем, что компонент имеет класс ошибки
  it('has error class', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('class')).toContain(errorClass);
  });

  //проверяем, что компонент имеет сообщение об ошибке 
  it('has error message', () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain('span');
  });

  //проверяем, что компонент не имеет сообщения об ошибке
  it('does not have error message', () => {
    propsData.errorText = '';
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain('span');
  });
});

// Список элементов для тестирования
/*
  + :value="value"
  + :type="type"
  + :name="name"
  + :class="{ 'text-field__input--error': showError }"
  + :placeholder="placeholder"
  + :required="required"
  + :disabled="disabled"
  + @input="$emit('input', $event.target.value)"
*/

// Данные из тест-хранилища
/*
  -
*/