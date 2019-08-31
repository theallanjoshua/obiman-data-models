import Utils from './utils';
import Employee from './employee';

export default class Business {
  constructor(business){
    const {
      id,
      label,
      logo,
      currency,
      employees,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...business };
    this.id = id || '';
    this.label = label || '';
    this.logo = logo || '';
    this.currency = currency || '';
    this.employees = (employees || []).map(item => new Employee(item).get());
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getSudoRoleText = () => 'OWNER';
  getRoles = () => [this.getSudoRoleText(), 'INGREDIENT MANAGER', 'PRODUCT MANAGER', 'INVOICE MANAGER'];
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setLogo = logo => this.set('logo', logo);
  setCurrency = currency => this.set('currency', currency);
  setEmployees = employees => this.set('employees', employees);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  validate = () => {
    const utils = new Utils();
    const labelErrors = !this.label.trim() ? { label: [ 'Name of the business cannot be empty' ] } : {};
    const currencyErrors = !this.currency.trim() ? { currency: [ 'Currency code for the business cannot be empty' ] } :
      !utils
        .getCurrencyCodes()
        .filter(value => this.currency === value)
        .length ? { currency: 'Please select a valid currency code' } : {};
    const sudoRoleText = this.getSudoRoleText();
    const employeesErrors = this.employees.reduce((acc, item) => {
      const employee = new Employee(item);
      const validationErrors = employee.validate();
      return Object.keys(validationErrors).length ? { ...acc, employees: [ 'Employees have errors' ] } : { ...acc };
    }, {
      ...!this.employees.filter(({ roles }) => roles.includes(sudoRoleText)).length ? { employees: [ `Minimum one user with role ${sudoRoleText} must be present` ] } : {}
    });
    return { ...labelErrors, ...currencyErrors, ...employeesErrors };
  }
}