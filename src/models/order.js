import ProductCompositionEntity from './product-composition-entity';

export default class Order {
  constructor(bill){
    const {
      id,
      productId,
      productLabel,
      composition,
      status,
      cancelReason,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = bill;
    this.id = id || '';
    this.productId = productId || '';
    this.productLabel = productLabel || '';
    this.composition = (composition || []).map(item => new ProductCompositionEntity(item).get());
    this.status = status || '';
    this.cancelReason = cancelReason || '';
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getStartState = () => 'Placed';
  getPositiveEndState = () => 'Served';
  getNegativeEndState = () => 'Cancelled'
  getStates = () => [ this.getStartState(), this.getPositiveEndState(), this.getNegativeEndState() ];
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setProductId = productId => this.set('productId', productId);
  setProductLabel = productLabel => this.set('productLabel', productLabel);
  setComposition = composition => this.set('composition', composition);
  setStatus = status => this.set('status', status);
  setCancelReason = cancelReason => this.set('cancelReason', cancelReason);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
}