export default class Ingredient {
  constructor(ingredient) {
    const { id, label, quantity, unit, cost, currency, threshold, expiryDate, lastStockedDate, businessId, createdDate, updatedDate, version } = { ...ingredient };
    this.id = id || '';
    this.label = label || '';
    this.quantity = quantity || 0;
    this.unit = unit || '';
    this.cost = cost || 0;
    this.currency = currency || '';
    this.threshold = threshold || 0;
    this.expiryDate = expiryDate || 0;
    this.lastStockedDate = lastStockedDate || 0;
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
  setQuantity = quantity => this.set('quantity', quantity);
  setUnit = unit => this.set('unit', unit);
  setCost = cost => this.set('cost', cost);
  setCurrency = currency => this.set('currency', currency);
  setThreshold = threshold => this.set('threshold', threshold);
  setExpiryDate = expiryDate => this.set('expiryDate', expiryDate);
  setLastStockedDate = lastStockedDate => this.set('lastStockedDate', lastStockedDate);
  setBusinessId = businessId => this.set('businessId', businessId);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setVersion = version => this.set('version', version);
}