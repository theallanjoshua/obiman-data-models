export default class BillCompositionEntity {
  constructor(billCompositionEntity){
    const {
      id,
      quantity
    } = { ...billCompositionEntity };
    this.id = id || '';
    this.quantity = quantity || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => ({ ...this, [key]: value});
  setId = id => this.set('id', id);
  setQuantity = quantity => this.set('quantity', quantity);
  validate = () => {
    const productErrors = !this.id ? { id: ['Name of the product cannot be empty' ] } : {};
    const quantityErrors = !this.quantity ? { quantity: ['Quantity cannot be zero' ] } : {};
    return { ...productErrors, ...quantityErrors };
  }
}