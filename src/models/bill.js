import BillCompositionEntity from './bill-composition-entity';
import Order from './order';

export default class Bill {
  constructor(bill  = {}){
    const {
      id,
      businessId,
      businessLabel,
      source,
      sourceId,
      composition,
      customer,
      status,
      cancelReason,
      taxlessTotal,
      tax,
      taxAmount,
      total,
      profit,
      currency,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = bill;
    this.id = id || '';
    this.businessId = businessId || '';
    this.businessLabel = businessLabel || '';
    this.source = source || '';
    this.sourceId = sourceId || '';
    this.composition = (composition || []).map(item => new BillCompositionEntity(item).get());
    this.customer = customer || '';
    this.status = status || '';
    this.cancelReason = cancelReason || '';
    this.taxlessTotal = taxlessTotal || 0;
    this.tax = tax || {};
    this.taxAmount = taxAmount || 0;
    this.total = total || 0;
    this.profit = profit || 0;
    this.currency = currency || '';
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
  getGroupedComposition = (preGroupingCondition) => this.composition
    .filter(preGroupingCondition ? preGroupingCondition : () => true)
    .reduce((acc, item) => {
      const existingItem = acc.filter(({ id }) => id === item.id)[0] || item;
      const { id, label, quantity = 0, price = 0, children = [] } = existingItem;
      return [ ...acc.filter(({ id }) => id !== item.id), {
        id,
        label,
        price,
        quantity: item.status !== new Order().getNegativeEndState() ? quantity + 1 : quantity,
        children: [ ...children, item ]
      }]
    }, []);
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setBusinessId = businessId => this.set('businessId', businessId);
  setBusinessLabel = businessLabel => this.set('businessLabel', businessLabel);
  setSource = source => this.set('source', source);
  setSourceId = sourceId => this.set('sourceId', sourceId);
  setComposition = composition => this.set('composition', composition);
  setCustomer = customer => this.set('customer', customer);
  setStatus = status => this.set('status', status);
  setCancelReason = cancelReason => this.set('cancelReason', cancelReason);
  setCurrency = currency => this.set('currency', currency);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  enrich = (products = [], orders = []) => {
    //Enrich status
    this.status = this.status || this.getStartState();
    // Enrich composition
    this.composition = this.composition.map(item => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const billCompositionEntityData = billCompositionEntity.get();
      const { id, orderId, status: existingStatus } = billCompositionEntityData;
      const { label, price, tax, profit = 0 } = products.filter(({ id: productId }) => id === productId)[0] || billCompositionEntityData;
      const { status } = orders.filter(({ id }) => id === orderId)[0] || { status: existingStatus };
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
    this.taxlessTotal = Number(compositionWithoutCancelledOrders
      .reduce((acc, item) => {
        const { price } = products.filter(({ id: productId }) => item.id === productId)[0] || item;
        return acc + price;
      }, 0).toFixed(2));
    // Enrich tax metadata
    this.tax = compositionWithoutCancelledOrders
      .reduce((acc, item) => {
        const { price, tax } = products.filter(({ id: productId }) => item.id === productId)[0] || item;
        return tax.reduce((accumulator, { type, percentage }) => {
          const amount = price * (percentage / 100);
          const existingAmount = accumulator[type] || 0;
          return { ...accumulator, [type]: Number((existingAmount + amount).toFixed(2)) };
        }, acc);
      }, {});
    // Enrich tax amount
    this.taxAmount = Number(Object.values(this.tax).reduce((acc, item) => acc + item, 0).toFixed(2));
    // Enrich total (after taxes)
    this.total = this.taxlessTotal + this.taxAmount;
    // Enrich profit
    this.profit = Number(compositionWithoutCancelledOrders.reduce((acc, { profit }) => acc + profit, 0).toFixed(2));
    return this;
  }
  validate = () => {
    const sourceErrors = !this.source.trim() ? { source: [ 'Source of the bill cannot be empty' ] } : {};
    const sourceIdErrors = !this.sourceId.trim() ? { sourceId: [ 'Source ID of the bill cannot be empty' ] } : {};
    const compositionErrors = this.composition.reduce((acc, item) => {
      const billCompositionEntity = new BillCompositionEntity(item);
      const validationErrors = billCompositionEntity.validate();
      return Object.keys(validationErrors).length ? { ...acc, composition: [ 'Composition has errors' ] } : { ...acc };
    }, {});
    const statusErrors = !this.getStates().includes(this.status) ? { status: [ 'Invalid status' ] } : {};
    return { ...sourceErrors, ...sourceIdErrors, ...compositionErrors, ...statusErrors };
  }
}