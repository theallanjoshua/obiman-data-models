import BillCompositionEntity from './bill-composition-entity';
import Product from './product';
import Order from './order';

export default class Bill {
  constructor(bill){
    const {
      id,
      source,
      composition,
      customer,
      status,
      cancelReason,
      taxlessTotal,
      tax,
      taxAmount,
      total,
      profit,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = bill;
    this.id = id || '';
    this.source = source || '';
    this.composition = (composition || []).map(item => new BillCompositionEntity(item).get());
    this.customer = customer || '';
    this.status = status || '';
    this.cancelReason = cancelReason || '';
    this.taxlessTotal = taxlessTotal || 0;
    this.tax = tax || {};
    this.taxAmount = taxAmount || 0;
    this.total = total || 0;
    this.profit = profit || 0;
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
  getStartState = () => 'Open';
  getPositiveEndState = () => 'Paid';
  getNegativeEndState = () => 'Cancelled'
  getStates = () => [ this.getStartState(), this.getPositiveEndState(), this.getNegativeEndState() ];
  getGroupedComposition = () => this.composition
    .reduce((acc, item) => {
      const existingItem = acc.filter(({ id }) => id === item.id)[0] || item;
      const { id, label, quantity = 0, price = 0, children = [] } = existingItem;
      return [ ...acc.filter(({ id }) => id !== item.id), {
        id,
        label,
        quantity: quantity + 1,
        price: price + item.price,
        children: [ ...children, item ]
      }]
    }, []);
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setSource = source => this.set('source', source);
  setComposition = composition => this.set('composition', composition);
  setCustomer = customer => this.set('customer', customer);
  setStatus = status => this.set('status', status);
  setCancelReason = cancelReason => this.set('cancelReason', cancelReason);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  enrich = (products, orders) => {
    const product = new Product().get();
    // Enrich composition
    this.composition = this.composition.map(item => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const billCompositionEntityData = billCompositionEntity.get();
      const { id, orderId } = billCompositionEntityData;
      const { label, price, tax, profit = 0 } = products.filter(({ id: productId }) => id === productId)[0] || product;
      const { status } = orders.filter(({ id }) => id === orderId)[0] || new Order().get();
      return billCompositionEntity
        .setLabel(label)
        .setPrice(price)
        .setTax(tax)
        .setProfit(profit)
        .setStatus(status)
        .get();
    });
    const compositionWithoutCancelledOrders = this.composition.filter(({ status }) => status !== new Order().getNegativeEndState());
    // Enrich total (before taxes)
    this.taxlessTotal = compositionWithoutCancelledOrders
      .reduce((acc, { id }) => {
        const { price } = products.filter(({ id: productId }) => id === productId)[0] || product;
        return acc + price;
      }, 0);
    // Enrich tax metadata
    this.tax = compositionWithoutCancelledOrders
      .reduce((acc, { id }) => {
        const { price, tax } = products.filter(({ id: productId }) => id === productId)[0] || product;
        return tax.reduce((accumulator, { type, percentage }) => {
          const amount = price * (percentage / 100);
          const existingAmount = accumulator[type] || 0;
          return { ...accumulator, [type]: existingAmount + amount };
        }, acc);
      }, {});
    // Enrich tax amount
    this.taxAmount = Object.values(this.tax).reduce((acc, item) => acc + item, 0);
    // Enrich total (after taxes)
    this.total = this.taxlessTotal + this.taxAmount;
    // Enrich profit
    this.profit = compositionWithoutCancelledOrders.reduce((acc, { profit }) => acc + profit, 0);
    return this;
  }
  validate = () => {
    const sourceErrors = !this.source.trim() ? { source: [ 'Source of the bill cannot be empty' ] } : {};
    const compositionErrors = this.composition.reduce((acc, item) => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const validationErrors = billCompositionEntity.validate();
      return Object.keys(validationErrors).length ? { ...acc, composition: [ 'Composition has errors' ] } : { ...acc };
    }, {});
    const statusErrors = !this.getStates().includes(this.status) ? { status: [ 'Invalid status' ] } : {};
    return { ...sourceErrors, ...compositionErrors, ...statusErrors };
  }
}