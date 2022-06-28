// Счетчик — это глупый компонент. Монтируем её с помощью shallowMount.
import { shallowMount } from "@vue/test-utils";
// Импортируем сам компонент.
import AppItemCounter from "@/common/components/AppItemCounter";

// Указываем название блока тестов — соответствует названию компонента.
describe("AppItemCounter", () => {
  // Определяем входные параметры по умолчанию и заглушки.
  const parentClass = "ingridients__counter";
  const colorClass = "counter__button--orange";
  const propsData = {
    value: 1,
    parentClass: parentClass,
    colorBtn: colorClass,
  };
  const listeners = { click: null };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;
  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
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
  it("It sets the initial value", () => {
    createComponent({ propsData });
    expect(Number(wrapper.find("input").element.value)).toBe(propsData.value);
  });

  //проверяем, что компонент генерирует событие при вводе
  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  //проверяем, что компонент выдает текущее входное значение при вводе
  it("emits the current input value when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = 2;
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual(2);
  });

  // проверяем, компонент генерирует событие по клику на "-"
  it('It emits an event on click on the button "-"', async () => {
    createComponent({ propsData });
    let btnMinus = wrapper.find(".counter__button--minus");
    await btnMinus.trigger("click");
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toEqual(0);
  });

  // проверяем, компонент генерирует событие по клику на "+"
  it('It emits an event on click on the button "+"', async () => {
    createComponent({ propsData, listeners });
    let btnPlus = wrapper.find(".counter__button--plus");
    await btnPlus.trigger("click");
    expect(wrapper.emitted().input).toBeTruthy(); //TODO?
    expect(wrapper.emitted().input[0][0]).toEqual(2);
  });

  // проверяем, что при значении меньше 0 или больше 2 кнопкам добавляется
  // атрибут disabled
  it("Check that the disabled attribute is added to the buttons", async () => {
    createComponent({ propsData });
    await wrapper.setProps({ value: 3 });
    let btnPlus = wrapper.find(".counter__button--plus");
    await wrapper.vm.$nextTick();
    expect(btnPlus.attributes("disabled")).toBe("disabled");
  });

  // проверяем, добавляется ли класс на обертку
  it("has wrapper class", () => {
    createComponent({ propsData });
    let wrap = wrapper.find(".counter");
    expect(wrap.attributes("class")).toContain(parentClass);
  });

  // проверяем, добавляется ли класс кнопке "+"
  it("button has color class", () => {
    createComponent({ propsData });
    let btn = wrapper.find(".counter__button--plus");
    expect(btn.attributes("class")).toContain(colorClass);
  });
});

// Список элементов для тестирования
/*
  + :class="parentClass"
  + :disabled="internalValue <= 0"
  + @click="internalValue--"
  + :value="internalValue"
  + @input="internalValue = $event.target.value"
  + :class="colorBtn"
  + :disabled="internalValue >= 3"
  + @click="internalValue++"
*/

// Данные из тест-хранилища
/*
  + 
*/
