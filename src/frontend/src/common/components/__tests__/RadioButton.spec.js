// Счетчик — это глупый компонент. Монтируем её с помощью shallowMount.
import { shallowMount } from '@vue/test-utils';
// Импортируем сам компонент.
import RadioButton from '@/common/components/RadioButton';

// Указываем название блока тестов — соответствует названию компонента.
describe('RadioButton', () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    checked: '3',
    classRadioBtn: '',
    classRadioInput: '',
    name: 'dough',
    value: '1',
  };
  const listeners = { click: null };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = options => {
    wrapper = shallowMount(RadioButton, options);
  };

  // Перед каждым тестом мы будем заменять click-событие свежей jest-функцией.
  // Это нужно для того, чтобы очистить информацию о вызове в предыдущих тестах.
  beforeEach(() => {
    listeners.click = jest.fn();
  });

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  //проверяем, что компонент устанавливает начальное значение модели
  it('It sets the initial value', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.element.value).toBe(propsData.value);
  });

  //проверяем, что имя поля ввода - имя prop 
  it('Radio input name is prop name', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('name')).toBe(propsData.name);
  });

  // проверяем, что добавляется атрибут checked
  it('Check that the checked attribute is added to the radio buttons', async () => {
    // createComponent({ propsData });
    // let input = wrapper.find('input[type="radio"]');
    // await wrapper.setProps({checked: '1'})
    // await wrapper.setChecked(true);
    let localThis = {
      ...propsData,
      checked: '1',
    };
    expect(RadioButton.computed.isChecked.call(localThis)).toBe(true);
    localThis = {
      ...propsData,
      checked: '2',
    };
    expect(RadioButton.computed.isChecked.call(localThis)).toBe(false);
    // input.element.checked = true;
    // input.trigger('click');
    // input.trigger('change');
    // await wrapper.vm.$nextTick();
    // console.log(input.attributes());
    // expect(wrapper.vm.checked).toBe('checked')
    // expect(input.attributes('checked')).toBe('checked');
  });

  // проверяем, добавляется ли класс на обертку
  it('has wrapper class', async () => {
    createComponent({ propsData });
    let wrap = wrapper.find('label');
    await wrapper.setProps({classRadioBtn: 'dough__input'});
    await wrapper.vm.$nextTick();
    expect(wrap.attributes('class')).toContain('dough__input');
  });

  // проверяем, добавляется ли класс радио-кнопке
  it('radio button has class', async () => {
    createComponent({ propsData });
    await wrapper.setProps({classRadioInput: 'visually-hidden'});
    await wrapper.vm.$nextTick();
    let input = wrapper.find('input[type="radio"]');
    expect(input.attributes('class')).toContain('visually-hidden');
  });

  // проверяем, компонент генерирует событие
  it('It emits an event change', async () => {
    createComponent({ propsData, listeners });
    await wrapper.setProps({value: '1'});
    let radioBtn = wrapper.find('input');
    await radioBtn.trigger('change');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change).toBeTruthy();
  });
});

// Список элементов для тестирования
/*
  + :name="name"
  + :value="value"
  + :checked="isChecked"
  + :class="classRadioInput"
  + :class="classRadioBtn"
  + @change="$emit('change', $event.target.value)"
*/

// Данные из тест-хранилища
/*
  + 
*/