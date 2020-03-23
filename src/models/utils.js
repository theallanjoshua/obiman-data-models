import convert from 'convert-units';
import currencyToSymbolMap from 'currency-symbol-map/map';
import getSymbolFromCurrency from 'currency-symbol-map';
import Ingredient from './ingredient';

const measures = ['length', 'area', 'mass', 'volume'];
const customUnits = ['count'];

export default class Utils {
  getUnits = (from) => from ? customUnits.includes(from) ? [from] : convert().from(from).possibilities() : [
    ...customUnits,
    ...convert()
      .list()
      .filter(({ measure }) => measures.includes(measure))
      .map(({ abbr }) => abbr)
  ];
  getCurrencyCodes = () => Array.from(new Set(Object.keys(currencyToSymbolMap)));
  getCurrencySymbol = currencyCode => getSymbolFromCurrency(currencyCode);
  convert = (value, from, to) => customUnits.includes(from) && to === from ? value : convert(value).from(from).to(to);
  getOptimizedIngredientQuantityMap = (composition = []) => composition
    .reduce((acc, { id, quantity: incomingQuantity, unit: incomingUnit }) => {
      const { quantity: existingQuantity, unit } = acc[id] || { quantity: 0, unit: incomingUnit };
      const normalizedQuantity = convert(incomingQuantity).from(incomingUnit).to(unit);
      const quantity = existingQuantity + normalizedQuantity;
      return { ...acc, [id]: { quantity, unit }};
    }, acc);
  getInventoryModifiedIngredients = (ingredients = [], optimizedIngredientQuantityMap = {}, isReplenish = false) => ingredients
    .filter(({ id }) => optimizedIngredientQuantityMap[id])
    .map(item => {
      const ingredient = new Ingredient(item);
      const { id, quantity: existingQuantity, unit, version } = ingredient.get();
      const { quantity: incomingQuantity, unit: incomingUnit } = optimizedIngredientQuantityMap[id];
      const normalizedQuantity = convert(incomingQuantity).from(incomingUnit).to(unit);
      const quantity = Math.round((isReplenish ? existingQuantity + normalizedQuantity : existingQuantity - normalizedQuantity) * 100) / 100;
      return ingredient
        .setQuantity(quantity)
        .setVersion(version + 1)
        .get();
    });
  getIngredientsToUpdate = (ingredients = [], composition = [], isReplenish = false) => this.getInventoryModifiedIngredients(ingredients, this.getOptimizedIngredientQuantityMap(composition), isReplenish);
  getInsufficientInventoryIngredients = (ingredients = []) => ingredients.filter(({ quantity, expiryDate }) => quantity < 0 || (expiryDate && expiryDate <= Date.now())).map(({ label }) => label);
}