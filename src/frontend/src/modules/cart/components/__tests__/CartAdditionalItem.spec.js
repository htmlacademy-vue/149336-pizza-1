import { mount } from "@vue/test-utils";
// Импортируем сам компонент.
import CartAdditionalItem from "@/modules/cart/components/CartAdditionalItem";

// Указываем название блока тестов — соответствует названию компонента.
describe("CartAdditionalItem", () => {
  // Переменные, которые будут переопределяться заново для каждого теста
  let wrapper;
  // Определяем входные параметры по умолчанию и заглушки.
  const propsData = {
    item: {
      count: 0,
      id: 1,
      image: "/public/img/cola.svg",
      name: "Cola-Cola 0,5 литра",
      price: 56,
    },
  };

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItem, options);
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
  it("is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  //проверяем, что компонент устанавливает начальное значение счетчика
  it("It sets the initial value counter", () => {
    createComponent({ propsData });
    expect(Number(wrapper.find(".counter__input").element.value)).toBe(
      propsData.item.count
    );
  });

  //проверяем, что компонент выводит путь к картинке в атрибуте src
  it("It displays the path to the image in the src attribute", async () => {
    createComponent({ propsData });
    let src = wrapper.find(".additional-list__description img");
    expect(src.attributes("src")).toBe(propsData.item.image);
  });

  //проверяем, что компонент выводит значение атрибута alt в картинке
  it("It displays the value of the alt attribute in the image", async () => {
    createComponent({ propsData });
    let alt = wrapper.find(".additional-list__description img");
    expect(alt.attributes("alt")).toBe(propsData.item.name);
  });

  //проверяем, что компонент выводит название товара
  it("It displays the product name", async () => {
    createComponent({ propsData });
    let name = wrapper.find(".additional-list__description span");
    expect(name.text()).toBe(propsData.item.name);
  });

  //проверяем, что компонент выводит цену товара
  it("It displays the product price", async () => {
    createComponent({ propsData });
    let price = wrapper.find('[data-test="price"]');
    expect(price.text()).toContain(propsData.item.price);
  });
});

// Список элементов для тестирования
/*
  + :src="item.image"
  + :alt="item.name"
  + {{ item.name }}
  + v-model="item.count"
  + :parentClass="`additional-list__counter`"
  + :colorBtn="`counter__button--orange`"
  + {{ item.price }}
*/

// Данные из тест хранилища
/*
  ...
 */
