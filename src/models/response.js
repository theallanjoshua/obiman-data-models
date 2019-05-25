export default class Response {
  constructor() {
    this.output = {};
    this.errors = [];
  }
  get = () => {
    const { output, errors } = { ...this };
    return { output, errors };
  }
  success = output =>{
    this.output = { ...output };
    this.errors = [];
  }
  error = error => {
    this.output = {};
    this.errors = [ ...this.errors, error ];
  }
}