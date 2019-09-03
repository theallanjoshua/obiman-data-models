import Utils from './utils';
import Employee from './employee';
import Ingredient from './ingredient';
import Product from './product';
import Bill from './bill';

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
  getWritePermissionText = () => 'Can edit business';
  getAllPermissions = () => [
    this.getWritePermissionText(),
    new Ingredient().getReadPermissionText(),
    new Ingredient().getWritePermissionText(),
    new Product().getReadPermissionText(),
    new Product().getWritePermissionText(),
    new Bill().getReadPermissionText(),
    new Bill().getWritePermissionText(),
  ];
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
    const writePermissionText = this.getWritePermissionText();
    const employeesErrors = this.employees.reduce((acc, item) => {
      const employee = new Employee(item);
      const validationErrors = employee.validate();
      return Object.keys(validationErrors).length ? { ...acc, employees: [ 'Employees have errors' ] } : { ...acc };
    }, {
      ...!this.employees.filter(({ permissions }) => permissions.includes(writePermissionText)).length ? { employees: [ `Minimum one user with permission ${writePermissionText} must be present` ] } : {}
    });
    return { ...labelErrors, ...currencyErrors, ...employeesErrors };
  }
}