import convert from 'convert-units';
import currencyToSymbolMap from 'currency-symbol-map/map';
import getSymbolFromCurrency from 'currency-symbol-map';
import Ingredient from './ingredient';

const measures = ['length', 'area', 'mass', 'volume'];

export default class Utils {
  getUnits = (from) => from ? convert().from(from).possibilities() : convert().list()
    .filter(({ measure }) => measures.includes(measure))
    .map(({ abbr }) => abbr);
  getCurrencyCodes = () => Array.from(new Set(Object.keys(currencyToSymbolMap)));
  getCurrencySymbol = currencyCode => getSymbolFromCurrency(currencyCode);
  convert = (value, from, to) => convert(value).from(from).to(to);
  getOptimizedIngredientQuantityMap = (billComposition = [], products = []) => {
    return billComposition.reduce((acc, { id: productId, quantity: productQuantity }) => {
      const product = products.filter(({ id }) => id === productId)[0];
      const { composition: productComposition } = product;
      const ingredients = productComposition.reduce((acc, { id, quantity, unit }) => [ ...acc, { id, quantity: quantity * productQuantity, unit} ], []);
      return ingredients.reduce((acc, { id, quantity: incomingQuantity, unit: incomingUnit }) => {
        const { quantity: existingQuantity, unit } = acc[id] || { quantity: 0, unit: incomingUnit };
        const normalizedQuantity = convert(incomingQuantity).from(incomingUnit).to(unit);
        const quantity = existingQuantity + normalizedQuantity;
        return { ...acc, [id]: { quantity, unit }};
      }, acc);
    }, {});
  }
  getInventoryModifiedIngredients = (ingredients = [], ingredientQuantityMap = {}, isReplenish = false) => {
    return ingredients
    .filter(({ id }) => !!ingredientQuantityMap[id])
    .map(item => {
      const ingredient = new Ingredient(item);
      const { id, quantity: existingQuantity, unit, version } = ingredient.get();
      const { quantity: incomingQuantity, unit: incomingUnit } = ingredientQuantityMap[id];
      const normalizedQuantity = convert(incomingQuantity).from(incomingUnit).to(unit);
      const quantity = isReplenish ? existingQuantity + normalizedQuantity : existingQuantity - normalizedQuantity;
      return ingredient
        .setQuantity(quantity)
        .setVersion(version + 1)
        .get();
    });
  }
  getIngredientsToUpdate = (ingredients = [], products = [], incomingBillComposition = [], existingBillComposition = []) => {
    const productsToRemove = existingBillComposition.filter(({ id, quantity }) => !incomingBillComposition.filter(entity => entity.id === id && entity.quantity === quantity).length);
    const productsToAdd = incomingBillComposition.filter(({ id, quantity }) => !existingBillComposition.filter(entity => entity.id === id && entity.quantity === quantity).length);
    const optimizedIngredientQuantityMapToReplenish = this.getOptimizedIngredientQuantityMap(productsToRemove, products);
    const optimizedIngredientQuantityMapToSubtract = this.getOptimizedIngredientQuantityMap(productsToAdd, products);
    const replenishedIngredients = this.getInventoryModifiedIngredients(ingredients, optimizedIngredientQuantityMapToReplenish, true);
    const ingredientsWithReplenishedIngredients = ingredients.map(ingredient => replenishedIngredients.filter(({ id }) => ingredient.id === id)[0] || ingredient);
    const subtractedIngredients = this.getInventoryModifiedIngredients(ingredientsWithReplenishedIngredients, optimizedIngredientQuantityMapToSubtract);
    return replenishedIngredients.reduce((acc, item) => !acc.filter(({ id }) => item.id === id).length ? [ ...acc, item ] : [ ...acc ], subtractedIngredients);
  }
  getInsufficientInventoryIngredients = (ingredients = []) => ingredients.filter(({ quantity }) => quantity < 0).map(({ label }) => label);
}