import Tax from './tax';

export default class BillCompositionEntity {
  constructor(billCompositionEntity = {}){
    const {
      orderId,
      id,
      label,
      price,
      tax,
      profit,
      status
    } = billCompositionEntity;
    this.orderId = orderId || '';
    this.id = id || '';
    this.label = label || '';
    this.price = price || 0;
    this.tax = (tax || []).map(item => new Tax(item).get());
    this.profit = profit || 0;
    this.status = status || '';
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setOrderId = orderId => this.set('orderId', orderId);
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setPrice = price => this.set('price', price);
  setTax = tax => this.set('tax', tax);
  setProfit = profit => this.set('profit', profit);
  setStatus = status => this.set('status', status);
  validate = () => {
    const productErrors = !this.id ? { id: ['Name of the product cannot be empty' ] } : {};
    return { ...productErrors };
  }
}