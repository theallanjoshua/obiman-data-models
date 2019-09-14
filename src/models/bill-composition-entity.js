import { numberValidation } from '../utils/validation';
import Tax from './tax';

export default class BillCompositionEntity {
  constructor(billCompositionEntity){
    const {
      id,
      label,
      quantity,
      price,
      tax
    } = { ...billCompositionEntity };
    this.id = id || '';
    this.label = label || '';
    this.quantity = quantity || 0;
    this.price = price || 0;
    this.tax = (tax || []).map(item => new Tax(item).get());
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setQuantity = quantity => this.set('quantity', quantity);
  setPrice = price => this.set('price', price);
  setTax = tax => this.set('tax', tax);
  validate = () => {
    const productErrors = !this.id ? { id: ['Name of the product cannot be empty' ] } : {};
    const quantityErrors = !this.quantity ? { quantity: ['Quantity cannot be zero' ] } : {};
    return { ...productErrors, ...quantityErrors, ...priceErrors, ...taxErrors };
  }
}