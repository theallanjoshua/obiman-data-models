import Utils from './utils';
import Employee from './employee';
import Ingredient from './ingredient';
import Product from './product';
import Bill from './bill';
import Contact from './contact';
import Table from './table';
import {
  arrayDuplicatesValidation,
  arrayEmptyValidation
} from '../utils/validation';

export default class Business {
  constructor(business){
    const {
      id,
      label,
      logo,
      address,
      contacts,
      coordinates,
      currency,
      employees,
      ingredientLocations,
      productClassifications,
      productTaxesTypes,
      billExternalSources,
      tables,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...business };
    this.id = id || '';
    this.label = label || '';
    this.logo = logo || '';
    this.address = address || '';
    this.contacts = (contacts || []).map(item => new Contact(item).get());
    this.coordinates = coordinates || '';
    this.currency = currency || '';
    this.employees = (employees || []).map(item => new Employee(item).get());
    this.ingredientLocations = ingredientLocations || [],
    this.productClassifications = productClassifications || [],
    this.productTaxesTypes = productTaxesTypes || [],
    this.billExternalSources = billExternalSources || [],
    this.tables = (tables || []).map(item => new Table(item).get()),
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getUpdatePermissionText = () => 'All';
  getAllPermissions = () => {
    const ingredient = new Ingredient();
    const product = new Product();
    const bill = new Bill();
    return [
      this.getUpdatePermissionText(),
      ingredient.getCreatePermissionText(),
      ingredient.getReadPermissionText(),
      ingredient.getUpdatePermissionText(),
      ingredient.getDeletePermissionText(),
      product.getCreatePermissionText(),
      product.getReadPermissionText(),
      product.getUpdatePermissionText(),
      product.getDeletePermissionText(),
      bill.getCreatePermissionText(),
      bill.getReadPermissionText(),
      bill.getUpdatePermissionText(),
      bill.getDeletePermissionText(),
    ];
  };
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setLogo = logo => this.set('logo', logo);
  setAddress = address => this.set('address', address);
  setContacts = contacts => this.set('contacts', contacts);
  setCoordinates = coordinates => this.set('coordinates', coordinates);
  setCurrency = currency => this.set('currency', currency);
  setEmployees = employees => this.set('employees', employees);
  setIngredientLocations = ingredientLocations => this.set('ingredientLocations', ingredientLocations);
  setProductClassifications = productClassifications => this.set('productClassifications', productClassifications);
  setProductTaxTypes = productTaxesTypes => this.set('productTaxesTypes', productTaxesTypes);
  setBillExternalSources = billExternalSources => this.set('billExternalSources', billExternalSources);
  setTables = tables => this.set('tables', tables);
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
    const updatePermissionText = this.getUpdatePermissionText();
    const sudoEmployeeError = !this.employees.filter(({ permissions }) => permissions.includes(updatePermissionText)).length ? [ `Minimum one user with permission ${updatePermissionText} must be present` ] : [];
    const duplicateEmployeesError = arrayDuplicatesValidation(this.employees, ({ id }) => id).length ? [ 'Some emails are used more than once' ]: [];
    const initEmployeeErrors = sudoEmployeeError.length || duplicateEmployeesError.length ? { employees: [ ...sudoEmployeeError, ...duplicateEmployeesError ] } : {};
    const employeesErrors = this.employees.reduce((acc, item) => {
      const employee = new Employee(item);
      const validationErrors = employee.validate();
      const { employees } = { employees: [], ...acc };
      const employeesErrorText = 'Employees have errors';
      const errors = Object.keys(validationErrors).length && !employees.includes(employeesErrorText) ? [ ...employees, employeesErrorText ] : [ ...employees ];
      return errors.length ? { ...acc, employees: errors } : { ...acc };
    }, initEmployeeErrors);
    const contactErrors = this.contacts.reduce((acc, item) => {
      const contact = new Contact(item);
      const validationErrors = contact.validate();
      return Object.keys(validationErrors).length ? { ...acc, contacts: [ 'Contacts have errors' ] } : { ...acc };
    }, {});
    const metadataErrors = [{
      key: 'ingredientLocations',
      array: this.ingredientLocations,
      label: 'Ingredient locations'
    }, {
      key: 'productClassifications',
      array: this.productClassifications,
      label: 'Product classifications'
    }, {
      key: 'productTaxesTypes',
      array: this.productTaxesTypes,
      label: 'Product tax types'
    }, {
      key: 'billExternalSources',
      array: this.billExternalSources,
      label: 'Bill external sources'
    }].reduce((acc, { key = '', array = [], label = '' }) => {
      const emptyErrors = arrayEmptyValidation(array).length ? [ `${label} cannot have empty values` ] : [];
      const duplicateErrors = arrayDuplicatesValidation(array).length ? [ `Some ${label.toLowerCase()} are used more than once` ]: [];
      const errors = emptyErrors.length || duplicateErrors.length ? { [key]: [ ...emptyErrors, ...duplicateErrors ] } : {};
      return { ...acc, ...errors };
    }, {});
    return {
      ...labelErrors,
      ...currencyErrors,
      ...employeesErrors,
      ...contactErrors,
      ...metadataErrors
    };
  }
}