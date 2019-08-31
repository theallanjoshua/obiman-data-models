export default class User {
  constructor(user){
    const {
      id,
      label,
      avatar,
      businesses,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...user };
    this.id = id || '';
    this.label = label || '';
    this.avatar = avatar || '';
    this.businesses = businesses || [];
    this.createdDate = createdDate || 0;
    this.updatedDate = updatedDate || 0;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.version = version || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setAvatar = avatar => this.set('avatar', avatar);
  setBusinesses = businesses => this.set('businesses', businesses);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
}