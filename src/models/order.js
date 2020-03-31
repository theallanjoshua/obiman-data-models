const STATES = [
  {
    id: 'Placed',
    isStartState: true,
    needsAuthorization: false,
    isNegative: false,
    business: {
      label: 'New',
      description: '',
      nextStates: [{
        id: 'Confirmed',
        label: 'Confirm'
      }, {
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Placed',
      description: 'Awaiting confirmation',
      nextStates: []
    }
  },
  {
    id: 'Confirmed',
    needsAuthorization: true,
    isNegative: false,
    business: {
      label: 'Pending',
      description: '',
      nextStates: [{
        id: 'Preparing',
        label: 'Start preparing'
      }, {
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Confirmed',
      description: 'Pending preparation',
      nextStates: [{
        id: 'Cancel',
        label: 'Cancel'
      }]
    }
  },
  {
    id: 'Preparing',
    needsAuthorization: true,
    isNegative: false,
    business: {
      label: 'Preparing',
      description: '',
      nextStates: [{
        id: 'Prepared',
        label: 'Prepared'
      }, {
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Preparing',
      description: '',
      nextStates: [{
        id: 'Cancel',
        label: 'Cancel'
      }]
    }
  },
  {
    id: 'Prepared',
    needsAuthorization: true,
    isNegative: false,
    business: {
      label: 'Prepared',
      description: '',
      nextStates: [{
        id: 'Served',
        label: 'Served'
      }, {
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Prepared',
      description: '',
      nextStates: [{
        id: 'Cancel',
        label: 'Cancel'
      }]
    }
  },
  {
    id: 'Served',
    isEndState: true,
    needsAuthorization: true,
    isNegative: false,
    business: {
      label: 'Served',
      description: '',
      nextStates: [{
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Served',
      description: '',
      nextStates: [{
        id: 'Cancel',
        label: 'Cancel'
      }]
    }
  },
  {
    id: 'Cancel',
    needsAuthorization: false,
    isNegative: true,
    business: {
      label: 'Cancellation request',
      description: '',
      nextStates: [{
        id: 'Cancelled',
        label: 'Cancel'
      }]
    },
    customer: {
      label: 'Pending cancellation',
      description: '',
      nextStates: []
    }
  },
  {
    id: 'Cancelled',
    isEndState: true,
    needsAuthorization: true,
    isNegative: true,
    business: {
      label: 'Cancelled',
      description: '',
      nextStates: []
    },
    customer: {
      label: 'Cancelled',
      description: '',
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
  getStartState = () => STATES.filter(({ isStartState }) => isStartState)[0].id;
  getEndStates = () => STATES.filter(({ isEndState }) => isEndState).map(({ id }) => id);
  getPositiveEndState = () => STATES.filter(({ isEndState, isNegative }) => isEndState && !isNegative)[0].id;
  getNegativeEndState = () => STATES.filter(({ isEndState, isNegative }) => isEndState && isNegative)[0].id;
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