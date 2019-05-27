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
  }
  get = () => {
    return { ...this };
  }
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
}