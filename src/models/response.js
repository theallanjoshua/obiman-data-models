export default class Response {
  constructor() {
    this.output = {};
    this.errors = [];
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  success = output =>{
    this.output = { ...output };
    this.errors = [];
    return this;
  }
  error = error => {
    this.output = {};
    this.errors = [ ...this.errors, error ];
    return this;
  }
}