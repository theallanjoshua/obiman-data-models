const numberDropdownValidation = (numberKey, numberLabel, numberValue, dropdownKey, dropdownLabel, dropdownValue, dropdownValues) => {
  let errors = {};
  if(isNaN(numberValue)) {
    errors[numberKey] = { [numberKey]: [ ...errors[numberKey], `${numberLabel} has to be a number` ] }
  }
  if(numberValue < 0) {
    errors[numberKey] = { [numberKey]: [ ...errors[numberKey], `${numberLabel} cannot be below 0` ] }
  }
  if(numberValue && !dropdownValue.trim()) {
    errors.unit = { [dropdownKey]: [ ...errors[dropdownKey], `${dropdownLabel} cannot be empty when ${numberLabel.toLowerCase()} is entered` ] }
  }
  if(numberValue && !dropdownValues.filter(value => value === dropdownValue).length) {
    errors.unit = { [dropdownKey]: [ ...errors[dropdownKey], `Invalid ${dropdownLabel.toLowerCase()}. Please select valid ${dropdownLabel.toLowerCase()} from dropdown` ] }
  }
  return { ...errors };
}

export const quantityUnitValidation = (quantityKey, quantityLabel, quantityValue, unitKey, unitLabel, unitValue, validUnits) => {
  return numberDropdownValidation(quantityKey, quantityLabel, quantityValue, unitKey, unitLabel, unitValue, validUnits);
}

export const costCurrencyValidation = (costKey, costLabel, costValue, currencyKey, currencyLabel, currencyValue, validCurrencies) => {
  return numberDropdownValidation(costKey, costLabel, costValue, currencyKey, currencyLabel, currencyValue, validCurrencies);
}