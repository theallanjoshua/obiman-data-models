export default class Table {
  constructor(table = {}){
    const {
      id,
      label,
      location
    } = table;
    this.id = id || '';
    this.label = label || '';
    this.location = location || '';
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  setId = id => this.set('id', id);
  setLabel = label => this.set('label', label);
  setLocation = location => this.set('location', location);
  validate = () => {
    const labelErrors = !this.label.trim() ? { label: [ 'Name of the table cannot be empty' ] } : {};
    return { ...labelErrors, ...capacityErrors };
  }
}