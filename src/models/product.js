import ProductCompositionEntity from './product-composition-entity';
import Tax from './tax';
import { numberValidation } from '../utils/validation';

export default class Product {
  constructor(product){
    const {
      id,
      label,
      description,
      image,
      composition,
      recipe,
      price,
      tax,
      classification,
      isAvailable = true,
      nextAvailable,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...product };
    this.id = id || '';
    this.label = label || '';
    this.description = description || '';
    this.image = image || '';
    this.composition = (composition || []).map(item => new ProductCompositionEntity(item).get());
    this.recipe = recipe || '';
    this.price = price || 0;
    this.tax = (tax || []).map(item => new Tax(item).get());
    this.classification = classification || '';
    this.isAvailable = isAvailable;
    this.nextAvailable = nextAvailable || 0;
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getCreatePermissionText = () => 'create products';
  getReadPermissionText = () => 'view products';
  getUpdatePermissionText = () => 'edit products';
  getDeletePermissionText = () => 'delete products';
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
  setTax = tax => this.set('tax', tax);
  setClassification = classification => this.set('classification', classification);
  setIsAvailable = isAvailable => this.set('isAvailable', isAvailable);
  setNextAvailable = nextAvailable => this.set('nextAvailable', nextAvailable);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  validate = () => {
    const labelErrors = !this.label.trim() ? { label: [ 'Name of the product cannot be empty' ] } : {};
    const compositionErrors = this.composition.reduce((acc, item) => {
      const productCompositionEntity = new ProductCompositionEntity(item);
      const validationErrors = productCompositionEntity.validate();
      return Object.keys(validationErrors).length ? { ...acc, composition: [ 'Composition has errors' ] } : { ...acc };
    }, {});
    const priceErrors = numberValidation('price', 'Price', this.price, true);
    const taxErrors = this.tax.reduce((acc, item) => {
      const tax = new Tax(item);
      const validationErrors = tax.validate();
      return Object.keys(validationErrors).length ? { ...acc, tax: [ 'Tax has errors' ] } : { ...acc };
    }, {});
    return { ...labelErrors, ...compositionErrors, ...priceErrors, ...taxErrors };
  }
}