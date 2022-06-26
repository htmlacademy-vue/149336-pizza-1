import { capitalize, totalPrice } from '@/common/helpers';

describe('test helpers functions', () => {

  it('test capitalize', () => {
    expect(capitalize('word')).toBe('Word');
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('test totalPrice', () => {
    const order = {
      addressId: null,
      id: 1,
      orderAddress: null,
      orderPizzas: [
        {
          doughId: 1,
          doughPrice: 300,
          id: 1,
          ingredients: [
            {
              id: 1,
              ingredientId: 1,
              pizzaId: 1,
              price: 33,
              quantity: 1,
            },
            {
              id: 2,
              ingredientId: 2,
              pizzaId: 1,
              price: 42,
              quantity: 1,
            },
            {
              id: 3,
              ingredientId: 3,
              pizzaId: 1,
              price: 42,
              quantity: 1,
            },
            {
              id: 7,
              ingredientId: 7,
              pizzaId: 1,
              price: 42,
              quantity: 3,
            },
          ],
          name: "любимая",
          orderId: 1,
          quantity: 1,
          sauceId: 2,
          saucePrice: 50,
          sizeId: 2,
          sizeMultiplier: 3,
          totalPricePizza: 1779,
        },
      ],
      orderMisc: [],
      userId: 'abracadabra',
    };
    const store = {
      Builder: {
        doughs: [
          {
            id: 1,
            name: "Толстое",
            image: "/public/img/dough-large.svg",
            description: "Из твердых сортов пшеницы",
            price: 300,
            type: "large",
            isChecked: false,
          },
          {
            id: 2,
            name: "Тонкое",
            image: "/public/img/dough-light.svg",
            description: "Из твердых сортов пшеницы",
            price: 300,
            type: "light",
            isChecked: true,
          }
        ],
        sizes: [
          {
            id: 1,
            name: "23 см",
            image: "/public/img/diameter.svg",
            multiplier: 1,
            size: "small",
            isChecked: false,
          },
          {
            id: 3,
            name: "32 см",
            image: "/public/img/diameter.svg",
            multiplier: 2,
            size: "normal",
            isChecked: true,
          },
          {
            id: 2,
            name: "45 см",
            image: "/public/img/diameter.svg",
            multiplier: 3,
            size: "big",
            isChecked: false,
          }
        ],
        sauces: [
          {
            id: 1,
            name: "Томатный",
            price: 50,
            value: "tomato",
            isChecked: true,
          },
          {
            id: 2,
            name: "Сливочный",
            price: 50,
            value: "creamy",
            isChecked: false,
          }
        ],
        ingredients: [
          {
            id: 1,
            name: "Грибы",
            image: "/public/img/filling/mushrooms.svg",
            price: 33,
            label: "mushrooms",
            count: 0,
          },
          {
            id: 2,
            name: "Чеддер",
            image: "/public/img/filling/cheddar.svg",
            price: 42,
            label: "cheddar",
            count: 0,
          },
          {
            id: 3,
            name: "Ветчина",
            image: "/public/img/filling/ham.svg",
            price: 42,
            label: "ham",
            count: 0,
          },
          {
            id: 4,
            name: "Лук",
            image: "/public/img/filling/onion.svg",
            price: 21,
            label: "onion",
            count: 0,
          },
          {
            id: 5,
            name: "Бекон",
            image: "/public/img/filling/bacon.svg",
            price: 42,
            label: "bacon",
            count: 0,
          },
          {
            id: 6,
            name: "Ананас",
            image: "/public/img/filling/ananas.svg",
            price: 25,
            label: "ananas",
            count: 0,
          },
          {
            id: 7,
            name: "Салями",
            image: "/public/img/filling/salami.svg",
            price: 42,
            label: "salami",
            count: 0,
          },
          {
            id: 8,
            name: "Маслины",
            image: "/public/img/filling/olives.svg",
            price: 25,
            label: "olives",
            count: 0,
          },
          {
            id: 9,
            name: "Чили",
            image: "/public/img/filling/chile.svg",
            price: 21,
            label: "chile",
            count: 0,
          },
          {
            id: 10,
            name: "Халапеньо",
            image: "/public/img/filling/jalapeno.svg",
            price: 25,
            label: "jalapeno",
            count: 0,
          },
          {
            id: 11,
            name: "Томаты",
            image: "/public/img/filling/tomatoes.svg",
            price: 35,
            label: "tomatoes",
            count: 0,
          },
          {
            id: 12,
            name: "Моцарелла",
            image: "/public/img/filling/mozzarella.svg",
            price: 35,
            label: "mozzarella",
            count: 0,
          },
          {
            id: 13,
            name: "Лосось",
            image: "/public/img/filling/salmon.svg",
            price: 50,
            label: "salmon",
            count: 0,
          },
          {
            id: 14,
            name: "Пармезан",
            image: "/public/img/filling/parmesan.svg",
            price: 35,
            label: "parmesan",
            count: 0,
          },
          {
            id: 15,
            name: "Блю чиз",
            image: "/public/img/filling/blue_cheese.svg",
            price: 50,
            label: "blue_cheese",
            count: 0,
          }
        ],
        composition: {
          dough: {
              id: 1,
              value: "large",
              price: 300,
          },
          size: {
            id: 5,
            value: "small",
            multiplier: 1,
          },
          sauce: {
            id: 1,
            value: "tomato",
            price: 50,
          },
          ingr: [
            {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              label: "mushrooms",
              count: 0,
            },
            {
              id: 2,
              name: "Чеддер",
              image: "/public/img/filling/cheddar.svg",
              price: 42,
              label: "cheddar",
              count: 0,
            },
            {
              id: 3,
              name: "Ветчина",
              image: "/public/img/filling/ham.svg",
              price: 42,
              label: "ham",
              count: 0,
            },
            {
              id: 4,
              name: "Лук",
              image: "/public/img/filling/onion.svg",
              price: 21,
              label: "onion",
              count: 0,
            },
            {
              id: 5,
              name: "Бекон",
              image: "/public/img/filling/bacon.svg",
              price: 42,
              label: "bacon",
              count: 0,
            },
            {
              id: 6,
              name: "Ананас",
              image: "/public/img/filling/ananas.svg",
              price: 25,
              label: "ananas",
              count: 0,
            },
            {
              id: 7,
              name: "Салями",
              image: "/public/img/filling/salami.svg",
              price: 42,
              label: "salami",
              count: 0,
            },
            {
              id: 8,
              name: "Маслины",
              image: "/public/img/filling/olives.svg",
              price: 25,
              label: "olives",
              count: 0,
            },
            {
              id: 9,
              name: "Чили",
              image: "/public/img/filling/chile.svg",
              price: 21,
              label: "chile",
              count: 0,
            },
            {
              id: 10,
              name: "Халапеньо",
              image: "/public/img/filling/jalapeno.svg",
              price: 25,
              label: "jalapeno",
              count: 0,
            },
            {
              id: 11,
              name: "Томаты",
              image: "/public/img/filling/tomatoes.svg",
              price: 35,
              label: "tomatoes",
              count: 0,
            },
            {
              id: 12,
              name: "Моцарелла",
              image: "/public/img/filling/mozzarella.svg",
              price: 35,
              label: "mozzarella",
              count: 0
            },
            {
              id: 13,
              name: "Лосось",
              image: "/public/img/filling/salmon.svg",
              price: 50,
              label: "salmon",
              count: 0,
            },
            {
              id: 14,
              name: "Пармезан",
              image: "/public/img/filling/parmesan.svg",
              price: 35,
              label: "parmesan",
              count: 0,
            },
            {
              id: 15,
              name: "Блю чиз",
              image: "/public/img/filling/blue_cheese.svg",
              price: 50,
              label: "blue_cheese",
              count: 0,
            },
          ],
          totalPrice: "__vue_devtool_nan__",
          classPizza: "pizza--foundation--small-tomato",
          pizzaFilling: [],
          namePizza: "",
        }
      }
    };
    const newOrder = totalPrice(order, store);
    expect(newOrder.orderPizzas[0].totalPricePizza).toBe(1779);
  });
});
