import Utils from './utils';
import { quantityUnitValidation, costCurrencyValidation } from '../utils/validation';

export default class Product {
  constructor(product){
    const { id, label, description, image, composition, recipe, price, currency, tax, businessId, createdDate, updatedDate, version } = { ...product };
    this.id = id || '';
    this.label = label || '';
    this.description = description || '';
    this.image = image || '';
    this.composition = composition || [];
    this.recipe = recipe || '';
    this.price = price || 0;
    this.currency = currency || '';
    this.tax = tax || [];
    this.businessId = businessId || '';
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.version = version || 0;
    this.utils = new Utils();
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setDescription = description => this.set('description', description);
  setImage = image => this.set('image', image);
  setComposition = composition => this.set('composition', composition);
  setRecipe = recipe => this.set('recipe', recipe);
  setPrice = price => this.set('price', price);
  setCurrency = currency => this.set('currency', currency);
  setTax = tax => this.set('tax', tax);
  setBusinessId = businessId => this.set('businessId', businessId);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setVersion = version => this.set('version', version);
  validate = () => {
    const utils = new Utils();
    const labelErrors = !this.label.trim() ? { label: ['Name of the product cannot be empty' ] } : {};
    const compositionErrors = this.composition.map(entity => {
      const ingredientErrors = !entity.ingredient ? { ingredient: ['Name of the ingredient cannot be empty' ] } : {};
      const quantityUnitErrors = quantityUnitValidation('quantity', 'Quantity', entity.quantity, 'unit', 'Unit', entity.unit, utils.getUnits());
      return { ...ingredientErrors, ...quantityUnitErrors };
    });
    const priceCurrencyErrors = costCurrencyValidation('price', 'Selling price', this.price, 'currency', 'Currency', this.currency, utils.getCurrencyCodes());
    return { ...labelErrors, composition: compositionErrors, ...priceCurrencyErrors };
  }
}