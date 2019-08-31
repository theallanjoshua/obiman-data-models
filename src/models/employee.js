export default class Employee {
  constructor(employee){
    const {
      id,
      roles
    } = { ...employee };
    this.id = id || '';
    this.roles = roles || [];
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setRoles = roles => this.set('roles', roles);
  validate = () => {
    const idErrors = !this.id.trim() ? { id: [ 'Email cannot be empty' ] } : {};
    const rolesErrors = !this.roles.length ? { roles: [ 'Roles cannot be empty' ] } : {};
    return { ...idErrors, ...rolesErrors };
  }
}