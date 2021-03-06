export const numberValidation = (key, label, value, isMandatory = false, min = 0, max) => {
  const errors = {};
  if(isMandatory && !value) {
    errors[key] = [ ...(errors[key] || []), `${label} cannot be empty` ]
  }
  if(isNaN(value)) {
    errors[key] = [ ...(errors[key] || []), `${label} has to be a number` ]
  }
  if(value < min) {
    errors[key] = [ ...(errors[key] || []), `${label} cannot be below ${min}` ]
  }
  if(max && value > max) {
    errors[key] = [ ...(errors[key] || []), `${label} cannot be above ${max}` ]
  }
  return errors;
}

export const numberDropdownValidation = (numberKey, numberLabel, numberValue, dropdownKey, dropdownLabel, dropdownValue, dropdownValues, isMandatory) => {
  const errors = {};
  const numberErrors = numberValidation(numberKey, numberLabel, numberValue, isMandatory);
  if(numberValue && !dropdownValue.trim()) {
    errors[dropdownKey] = [ ...(errors[dropdownKey] || []), `${dropdownLabel} cannot be empty when ${numberLabel.toLowerCase()} is entered` ]
  }
  if(numberValue && !dropdownValues.filter(value => value === dropdownValue).length) {
    errors[dropdownKey] = [ ...(errors[dropdownKey] || []), `Invalid ${dropdownLabel.toLowerCase()}. Please select valid ${dropdownLabel.toLowerCase()} from dropdown` ]
  }
  return { ...errors, ...numberErrors };
}

export const arrayDuplicatesValidation = (array = [], getItemToValidate = item => item) => array
  .filter((item, index, array) => array
    .filter(originalItem => getItemToValidate(originalItem) === getItemToValidate(item)).length > 1
  )
export const arrayEmptyValidation = (array = [], getItemToValidate = item => item) => array
  .filter(item => !getItemToValidate(item).trim())