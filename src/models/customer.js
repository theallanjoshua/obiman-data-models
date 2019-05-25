export default class Customer {
  constructor(customer) {
    const { id, orders, amount, currency, status, review, location, businessId  } = { ...customer };
    this.id = id || '';
    this.orders = orders || [];
    this.amount = amount || 0;
    this.currency = currency || '';
    this.status = status || '';
    this.review = review || {};
    this.location = location || '';
    this.businessId = businessId || '';
  }
  get = () => {
    const { id, orders, amount, currency, status, review, location, businessId } = { ...this };
    return { id, orders, amount, currency, status, review, location, businessId };
  }
  set = (key, value) => {
    this[key] = value;
  }
  setId = id => {
    this.set('id', id);
    return this.get();
  }
  setOrders = orders => {
    this.set('orders', orders);
    return this.get();
  }
  setAmount = amount => {
    this.set('amount', amount);
    return this.get();
  }
  setCurrency = currency => {
    this.set('currency', currency);
    return this.get();
  }
  setStatus = status => {
    this.set('status', status);
    return this.get();
  }
  setReview = review => {
    this.set('review', review);
    return this.get();
  }
  setLocation = location => {
    this.set('location', location);
    return this.get();
  }
  setBusinessId = businessId => {
    this.set('businessId', businessId);
    return this.get();
  }
}