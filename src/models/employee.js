export default class Employee {
  constructor(employee){
    const {
      id,
      permissions
    } = { ...employee };
    this.id = id || '';
    this.permissions = permissions || [];
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setPermissions = permissions => this.set('permissions', permissions);
  validate = () => {
    const idErrors = !this.id.trim() ? { id: [ 'Email cannot be empty' ] } : {};
    const permissionsErrors = !this.permissions.length ? { permissions: [ 'Permissions cannot be empty' ] } : {};
    return { ...idErrors, ...permissionsErrors };
  }
}