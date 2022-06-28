import { mount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login";
import AppInput from "@/common/components/AppInput";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);

describe("Login", () => {
  let routerPush;
  let dispatch;
  let login;

  const methods = {
    login,
  };

  const mocks = {
    $router: {
      push: routerPush,
    },
    $store: {
      dispatch,
    },
  };

  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
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

  it("calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks, stubs });
    const emailInput = wrapper
      .find('[data-test="email-component"]')
      .find("input");
    const passInput = wrapper
      .find('[data-test="password-component"]')
      .find("input");
    emailInput.element.value = "user@example.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");
    await wrapper.find("form").trigger("submit");
    expect(dispatch).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith("/");
  });

  it("disabled button, when invalid form", async () => {
    createComponent({ localVue, mocks, stubs });
    const emailInput = wrapper
      .find('[data-test="email-component"]')
      .find("input");
    emailInput.setValue("user");
    await wrapper.vm.$nextTick();
    await emailInput.trigger("input");
    await flushPromises();
    expect(
      wrapper.find('button[type="submit"]').attributes().disabled
    ).toBeUndefined();
  });

  it("show eror message, when invalid form", async () => {
    createComponent({ localVue, mocks, stubs });
    const emailInput = wrapper
      .find('[data-test="email-component"]')
      .find("input");
    emailInput.setValue("user");
    await wrapper.vm.$nextTick();
    await emailInput.trigger("input");
    await flushPromises();
    const errorSpan = wrapper.find(".text-field__text");
    expect(errorSpan.text()).toBe(
      "Поле E-mail должно быть действительным электронным адресом"
    );
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
