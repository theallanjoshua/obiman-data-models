import { numberValidation } from '../utils/validation';

export default class Tax {
  constructor(tax){
    const {
      type,
      percentage
    } = { ...tax };
    this.type = type || '';
    this.percentage = percentage || 0;
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  setType = type => this.set('type', type);
  setPercentage = percentage => this.set('percentage', percentage);
  validate = () => {
    const typeErrors = !this.type.trim() ? { type: [ 'Type of the tax cannot be empty' ] } : {};
    const percentageErrors = numberValidation('percentage', 'Percentage', this.percentage, true, 0, 100);
    return { ...typeErrors, ...percentageErrors };
  }
}