import BillCompositionEntity from './bill-composition-entity';
import Product from './product';

export default class Bill {
  constructor(bill){
    const {
      id,
      label,
      composition,
      status,
      taxlessTotal,
      tax,
      taxAmount,
      total,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...bill };
    this.id = id || '';
    this.label = label || '';
    this.composition = (composition || []).map(item => new BillCompositionEntity(item).get());
    this.status = status || '';
    this.taxlessTotal = taxlessTotal || 0;
    this.tax = tax || {};
    this.taxAmount = taxAmount || 0;
    this.total = total || 0;
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getCreatePermissionText = () => 'create bills';
  getReadPermissionText = () => 'view bills';
  getUpdatePermissionText = () => 'edit bills';
  getDeletePermissionText = () => 'delete bills';
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setComposition = composition => this.set('composition', composition);
  setStatus = status => this.set('status', status);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  enrich = products => {
    const product = new Product().get();
    // Enrich composition
    this.composition = this.composition.map(item => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const billCompositionEntityData = billCompositionEntity.get();
      const { id } = billCompositionEntityData;
      const { label, price, tax } = products.filter(({ id: productId }) => id === productId)[0] || product;
      return billCompositionEntity
        .setLabel(label)
        .setPrice(price)
        .setTax(tax)
        .get();
    })
    // Enrich tax metadata
    this.tax = this.composition.reduce((acc, { id, quantity }) => {
      const { price, tax } = products.filter(({ id: productId }) => id === productId)[0] || product;
      const calculatedPrice = price * quantity;
      return tax.reduce((accumulator, { type, percentage }) => {
        const amount = calculatedPrice * (percentage / 100);
        const existingAmount = accumulator[type] || 0;
        return { ...accumulator, [type]: existingAmount + amount };
      }, acc);
    }, {});
    // Enrich tax amount
    this.taxAmount = Object.values(tax).reduce((acc, item) => acc + item, 0);
    this.taxlessTotal = this.composition.reduce((acc, { id, quantity }) => {
      const { price } = products.filter(({ id: productId }) => id === productId)[0] || product;
      const calculatedPrice = price * quantity;
      return acc + calculatedPrice;
    }, 0);
    // Enrich total bill amount
    this.total = this.taxlessTotal + this.taxAmount;
    return this;
  }
  validate = () => {
    const labelErrors = !this.label.trim() ? { label: [ 'Name of the bill cannot be empty' ] } : {};
    const compositionErrors = this.composition.reduce((acc, item) => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const validationErrors = billCompositionEntity.validate();
      return Object.keys(validationErrors).length ? { ...acc, composition: [ 'Composition has errors' ] } : { ...acc };
    }, {});
    return { ...labelErrors, ...compositionErrors };
  }
}