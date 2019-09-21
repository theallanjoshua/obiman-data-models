import Utils from './utils';
import { numberDropdownValidation } from '../utils/validation';

export default class Ingredient {
  constructor(ingredient) {
    const {
      id,
      label,
      quantity,
      unit,
      expiryDate,
      location,
      thresholdQuantity,
      thresholdUnit,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...ingredient };
    this.id = id || '';
    this.label = label || '';
    this.quantity = quantity || 0;
    this.unit = unit || '';
    this.expiryDate = expiryDate || 0;
    this.location = location || '';
    this.thresholdQuantity = thresholdQuantity || 0;
    this.thresholdUnit = thresholdUnit || '';
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getCreatePermissionText = () => 'add ingredients';
  getReadPermissionText = () => 'view ingredients';
  getUpdatePermissionText = () => 'edit ingredients';
  getDeletePermissionText = () => 'delete ingredients';
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setQuantity = quantity => this.set('quantity', quantity);
  setUnit = unit => this.set('unit', unit);
  setExpiryDate = expiryDate => this.set('expiryDate', expiryDate);
  setLocation = location => this.set('location', location);
  setThresholdQuantity = thresholdQuantity => this.set('thresholdQuantity', thresholdQuantity);
  setThresholdUnit = thresholdUnit => this.set('thresholdUnit', thresholdUnit);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  validate = () => {
    const utils = new Utils();
    const labelErrors = !this.label.trim() ? { label: [ 'Name of the ingredient cannot be empty' ] } : {};
    const quantityUnitErrors = numberDropdownValidation('quantity', 'Quantity', this.quantity, 'unit', 'Unit', this.unit, utils.getUnits());
    const thresholdQuantityUnitErrors = numberDropdownValidation('thresholdQuantity', 'Threshold Quantity', this.thresholdQuantity, 'thresholdUnit', 'Threshold unit', this.thresholdUnit, utils.getUnits(this.unit), false);
    return { ...labelErrors, ...quantityUnitErrors, ...thresholdQuantityUnitErrors };
  }
}