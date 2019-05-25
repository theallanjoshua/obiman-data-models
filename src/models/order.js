export default class Order {
  constructor(order) {
    const { id, product, status, businessId  } = { ...order };
    this.id = id || '';
    this.product = product || [];
    this.status = status || '';
    this.businessId = businessId || '';
  }
  get = () => {
    const { id, product, status, businessId } = { ...this };
    return { id, product, status, businessId };
  }
  set = (key, value) => {
    this[key] = value;
  }
  setId = id => {
    this.set('id', id);
    return this.get();
  }
  setProduct = product => {
    this.set('product', product);
    return this.get();
  }
  setStatus = status => {
    this.set('status', status);
    return this.get();
  }
  setBusinessId = businessId => {
    this.set('businessId', businessId);
    return this.get();
  }
}