import JwtService from "@/services/jwt.service";
import { DOUGH_TYPES, SIZES, SAUCES_VALUE } from "@/common/constants";
import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class MiscApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(notifier);
  }

  _normalize(misc) {
    return {
      ...misc,
      count: 0,
    };
  }

  async query() {
    const miscs = await axios.get("misc");
    return miscs.data.map((misc) => this._normalize(misc));
  }
}

export class DoughApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(notifier);
  }

  _normalize(dough) {
    return {
      ...dough,
      type: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
      isChecked: dough.name === "Тонкое",
    };
  }

  async query() {
    const doughs = await axios.get("dough");
    return doughs.data.map((dough) => this._normalize(dough));
  }
}

export class SizesApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(notifier);
  }

  _normalize(size) {
    return {
      ...size,
      size: size.multiplier ? SIZES[size.multiplier] : "",
      isChecked: size.multiplier === 2,
    };
  }

  async query() {
    const sizes = await axios.get("sizes");
    return sizes.data
      .map((size) => this._normalize(size))
      .slice()
      .sort((a, b) => a.multiplier - b.multiplier);
  }
}

export class SaucesApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(notifier);
  }

  _normalize(sauce) {
    return {
      ...sauce,
      value:
        sauce.name === "Сливочный"
          ? SAUCES_VALUE[2]
          : sauce.name === "Томатный"
          ? SAUCES_VALUE[1]
          : "",
      isChecked: sauce.name === "Томатный",
    };
  }

  async query() {
    const sauces = await axios.get("sauces");
    return sauces.data
      .map((sauce) => this._normalize(sauce))
      .slice()
      .sort((a, b) => b.name - a.name);
  }
}

export class IngredientsApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(notifier);
  }

  _normalize(ingredient) {
    return {
      ...ingredient,
      label: ingredient.image.slice(ingredient.image.lastIndexOf("/") + 1, -4),
      count: 0,
    };
  }

  async query() {
    const ingredients = await axios.get("ingredients");
    return ingredients.data.map((ingredient) => this._normalize(ingredient));
  }
}

export class AddressesApiService extends CrudApiService {
  constructor(notifier) {
    super("addresses", notifier);
  }

  _normalize(address) {
    return {
      building: address.building ? address.building : "",
      comment: address.comment ? address.comment : "",
      flat: address.flat ? address.flat : "",
      id: address.id,
      name: address.name ? address.name : "",
      street: address.street ? address.street : "",
      userId: address.userId,
    };
  }

  async get(config = {}) {
    const { data } = await axios.get(`addresses`, config);
    return data.map((address) => this._normalize(address));
  }

  async post(address) {
    const { data: newAddress } = await axios.post("addresses", address);
    return this._normalize(newAddress);
  }

  async put(address) {
    const data = await axios.put(`addresses/${address.id}`, address);
    return this._normalize(data);
  }

  async delete(address) {
    await axios.delete(`addresses/${address.id}`, address);
    return address;
  }
}

export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super("orders", notifier);
  }

  _normalize(order) {
    return {
      addressId: order.addressId,
      id: order.id,
      orderAddress: order.orderAddress || {},
      orderMisc: order.orderMisc || [],
      orderPizzas: order.orderPizzas || {},
      userId: order.userId,
    };
  }

  async get(config = {}) {
    const { data } = await axios.get(`orders`, config);
    return data.map((order) => this._normalize(order));
  }

  async post(order) {
    // await axios.post(`orders`, order);
    const { data: newOrder } = await axios.post(`orders`, order);
    return this._normalize(newOrder);
  }

  async delete(order) {
    await axios.delete(`orders/${order.id}`, order);
    return order;
  }
}
