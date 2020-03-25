export default class User {
  constructor(user){
    const {
      id,
      businesses,
      version
    } = user;
    this.id = id || '';
    this.businesses = businesses || [];
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setBusinesses = businesses => this.set('businesses', businesses);
  setVersion = version => this.set('version', version);
}