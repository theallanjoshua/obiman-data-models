export default class Product {
  constructor(product){
    const { id, label, description, image, composition, recipe, price, currency, tax, businessId } = { ...product };
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
  }
  get = () => {
    const { id, label, description, image, composition, recipe, price, currency, tax, businessId } = { ...this };
    return { id, label, description, image, composition, recipe, price, currency, tax, businessId };
  }
  set = (key, value) => {
    this[key] = value;
  }
  setId = id =>{
    this.set('id', id);
    return this.get();
  }
  setLabel = label =>{
    this.set('label', label);
    return this.get();
  }
  setDescription = description =>{
    this.set('description', description);
    return this.get();
  }
  setImage = image =>{
    this.set('image', image);
    return this.get();
  }
  setComposition = composition =>{
    this.set('composition', composition);
    return this.get();
  }
  setRecipe = recipe =>{
    this.set('recipe', recipe);
    return this.get();
  }
  setPrice = price =>{
    this.set('price', price);
    return this.get();
  }
  setCurrency = currency =>{
    this.set('currency', currency);
    return this.get();
  }
  setTax = tax =>{
    this.set('tax', tax);
    return this.get();
  }
  setBusinessId = businessId =>{
    this.set('businessId', businessId);
    return this.get();
  }
}