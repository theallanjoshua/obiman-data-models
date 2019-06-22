import Utils from './utils';
import { quantityUnitValidation } from '../utils/validation';

export default class ProductCompositionEntity {
  constructor(productCompositionEntity){
    const {
      id,
      label,
      quantity,
      unit,
      isAvailable
    } = { ...productCompositionEntity };
    this.id = id || '';
    this.label = label || '';
    this.quantity = quantity || 0;
    this.unit = unit || '';
    this.isAvailable = [true, false].indexOf(isAvailable) > -1 ? isAvailable : true;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setQuantity = quantity => this.set('quantity', quantity);
  setUnit = unit => this.set('unit', unit);
  setIsAvailable = isAvailable => this.set('isAvailable', isAvailable);
  validate = () => {
    const utils = new Utils();
    const ingredientErrors = !this.id ? { id: ['Name of the ingredient cannot be empty' ] } : {};
    const quantityUnitErrors = quantityUnitValidation('quantity', 'Quantity', this.quantity, 'unit', 'Unit', this.unit, utils.getUnits(), true);
    return { ...ingredientErrors, ...quantityUnitErrors };
  }
}