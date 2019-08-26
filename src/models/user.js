import Profile from './profile';

export default class User {
  constructor(user){
    const {
      id,
      name,
      profiles,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      version
    } = { ...user };
    this.id = id || '';
    this.name = name || '';
    this.profiles = profiles || [];
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
  setName = name => this.set('name', name);
  setProfiles = profiles => this.set('profiles', profiles);
  setCreatedDate = createdDate => this.set('createdDate', createdDate);
  setUpdatedDate = updatedDate => this.set('updatedDate', updatedDate);
  setCreatedBy = createdBy => this.set('createdBy', createdBy);
  setUpdatedBy = updatedBy => this.set('updatedBy', updatedBy);
  setVersion = version => this.set('version', version);
  validate = () => {
    const profilesErrors = this.profiles.reduce((acc, item) => {
      const profileErrors = new Profile(item).validate();
      return profileErrors ? { ...acc, profiles: [ 'Profiles has errors' ] } : { ...acc };
    }, {})
    return { ...profilesErrors };
  }
}