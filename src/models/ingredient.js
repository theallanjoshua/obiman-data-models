import convert from 'convert-units';
import currencyToSymbolMap from 'currency-symbol-map/map'
import { quantityUnitValidation, costCurrencyValidation } from '../utils/validation';

export default class Ingredient {
  constructor(ingredient) {
    const { id, label, quantity, unit, cost, currency, thresholdQuantity, thresholdUnit, expiryDate, businessId, createdDate, updatedDate, version } = { ...ingredient };
    this.id = id || '';
    this.label = label || '';
    this.quantity = quantity || 0;
    this.unit = unit || '';
    this.cost = cost || 0;
    this.currency = currency || '';
    this.thresholdQuantity = thresholdQuantity || 0;
    this.thresholdUnit = thresholdUnit || '';
    this.expiryDate = expiryDate || 0;
    this.businessId = businessId || '';
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getUnits = () => convert().possibilities();
  getCurrencyCodes = () => Array.from(new Set(Object.values(currencyToSymbolMap)));
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setQuantity = quantity => this.set('quantity', quantity);
  setUnit = unit => this.set('unit', unit);
  setCost = cost => this.set('cost', cost);
  setCurrency = currency => this.set('currency', currency);
  setThresholdQuantity = thresholdQuantity => this.set('thresholdQuantity', thresholdQuantity);
  setThresholdUnit = thresholdUnit => this.set('thresholdUnit', thresholdUnit);
  setExpiryDate = expiryDate => this.set('expiryDate', expiryDate);
  setBusinessId = businessId => this.set('businessId', businessId);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setVersion = version => this.set('version', version);
  validate = () => {
    const labelErrors = !this.label.trim() ? { label: ['Name of the ingredient cannot be empty' ] } : {}
    const quantityUnitErrors = quantityUnitValidation('quantity', 'Quantity', this.quantity, 'unit', 'Unit', this.unit, this.getUnits());
    const costCurrencyErrors = costCurrencyValidation('cost', 'Cost', this.cost, 'currency', 'Currency', this.currency, this.getCurrencyCodes());
    const thresholdQuantityUnitErrors = quantityUnitValidation('thresholdQuantity', 'Threshold quantity', this.thresholdQuantity, 'thresholdUnit', 'Threshold unit', this.thresholdUnit, this.getUnits());
    return { ...labelErrors, ...quantityUnitErrors, ...costCurrencyErrors, ...thresholdQuantityUnitErrors };
  }
}