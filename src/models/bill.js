import BillCompositionEntity from './bill-composition-entity';

export default class Bill {
  constructor(bill){
    const {
      id,
      label,
      composition,
      status,
      total,
      createdDate,
      updatedDate,
      version
    } = { ...bill };
    this.id = id || '';
    this.label = label || '';
    this.composition = (composition || []).map(item => new BillCompositionEntity(item).get());
    this.status = status || '';
    this.total = total || 0;
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setComposition = composition => this.set('composition', composition);
  setStatus = status => this.set('status', status);
  setTotal = total => this.set('total', total);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setVersion = version => this.set('version', version);
  validate = () => {
    const labelErrors = !this.label.trim() ? { label: ['Name of the bill cannot be empty' ] } : {};
    const compositionErrors = this.composition.reduce((acc, item) => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const validationErrors = billCompositionEntity.validate();
      return Object.keys(validationErrors).length ? { ...acc, composition: ['Composition has errors'] } : { ...acc };
    }, {});
    return { ...labelErrors, ...compositionErrors };
  }
}