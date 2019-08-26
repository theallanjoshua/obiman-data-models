export default class Profile {
  constructor(profile){
    const {
      businessId,
      role
    } = { ...profile };
    this.businessId = businessId || '';
    this.role = role || '';
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setBusinessId = businessId => this.set('businessId', businessId);
  setName = role => this.set('role', role);
  validate = () => {
    const businessIdErrors = !this.businessId.trim() ? { businessId: [ 'Business cannot be empty' ] } : {};
    const roleErrors = !this.role.trim() ? { role: [ 'Role cannot be empty' ] } : {};
    return { ...businessIdErrors, ...roleErrors };
  }
}