export default class Response {
  constructor() {
    this.output = {};
    this.errors = [];
  }
  get = () => {
    return { ...this };
  }
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