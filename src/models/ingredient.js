export default class Ingredient {
  constructor(ingredient) {
    const { id, label, quantity, unit, cost, currency, threshold, expiryDate, lastStockedDate, businessId } = { ...ingredient };
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
  }
  get = () => {
    const { id, label, quantity, unit, cost, threshold, expiryDate, lastStockedDate, businessId } = { ...this };
    return { id, label, quantity, unit, cost, threshold, expiryDate, lastStockedDate, businessId };
  }
  set = (key, value) => {
    this[key] = value;
  }
  setId = id => {
    this.set('id', id);
    return this.get();
  }
  setLabel = label => {
    this.set('label', label);
    return this.get();
  }
  setQuantity = quantity => {
    this.set('quantity', quantity);
    return this.get();
  }
  setUnit = unit => {
    this.set('unit', unit);
    return this.get();
  }
  setCost = cost => {
    this.set('cost', cost);
    return this.get();
  }
  setCurrency = currency => {
    this.set('currency', currency);
    return this.get();
  }
  setThreshold = threshold => {
    this.set('threshold', threshold);
    return this.get();
  }
  setExpiryDate = expiryDate => {
    this.set('expiryDate', expiryDate);
    return this.get();
  }
  setLastStockedDate = lastStockedDate => {
    this.set('lastStockedDate', lastStockedDate);
    return this.get();
  }
  setBusinessId = businessId => {
    this.set('businessId', businessId);
    return this.get();
  }
}