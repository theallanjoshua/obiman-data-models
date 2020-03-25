const STATES = [
  {
    id: 'Placed',
    needsAuthorization: false,
    isNegative: false,
    business: {
      shortLabel: 'New',
      label: '',
      nextStates: ['Confirm', 'Cancel']
    },
    customer: {
      shortLabel: 'Placed',
      label: 'Awaiting confirmation',
      nextStates: []
    }
  },
  {
    id: 'Cancel',
    needsAuthorization: true,
    isNegative: true,
    business: {
      shortLabel: 'Cancelled',
      label: '',
      nextStates: ['Confirmed', 'Cancel']
    },
    customer: {
      shortLabel: 'Cancelled',
      label: 'Awaiting confirmation',
      nextStates: ['Cancel']
    }
  },
  {
    id: 'Confirm',
    needsAuthorization: true,
    isNegative: false,
    business: {
      shortLabel: 'Pending',
      label: '',
      nextStates: ['Preparing', 'Cancel']
    },
    customer: {
      shortLabel: 'Confirmed',
      label: 'Pending preparation',
      nextStates: []
    }
  },
  {
    id: 'Preparing',
    needsAuthorization: true,
    isNegative: false,
    business: {
      shortLabel: 'Preparing',
      label: '',
      nextStates: ['Prepared', 'Cancel']
    },
    customer: {
      shortLabel: 'Preparing',
      label: '',
      nextStates: ['Cancel']
    }
  },
  {
    id: 'Prepared',
    needsAuthorization: true,
    isNegative: false,
    business: {
      shortLabel: 'Prepared',
      label: '',
      nextStates: ['Served', 'Cancel']
    },
    customer: {
      shortLabel: 'Prepared',
      label: '',
      nextStates: ['Cancel']
    }
  },
  {
    id: 'Served',
    needsAuthorization: true,
    isNegative: false,
    business: {
      shortLabel: 'Served',
      label: '',
      nextStates: ['Cancel']
    },
    customer: {
      shortLabel: 'Served',
      label: '',
      nextStates: []
    }
  }
];

export default class Order {
  constructor(bill = {}){
    const {
      id,
      productId,
      productLabel,
      billId,
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
    this.billId = billId || '';
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
  getNegativeEndState = () => 'Cancel';
  getStates = () => STATES;
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setProductId = productId => this.set('productId', productId);
  setProductLabel = productLabel => this.set('productLabel', productLabel);
  setBillId = billId => this.set('billId', billId);
  setStatus = status => this.set('status', status);
  setCancelReason = cancelReason => this.set('cancelReason', cancelReason);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
}