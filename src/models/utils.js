import convert from 'convert-units';
import currencyToSymbolMap from 'currency-symbol-map/map';
import getSymbolFromCurrency from 'currency-symbol-map';

export default class Utils {
  getUnits = () => convert().possibilities();
  getUnitsPossibilitiesFrom = (from) => convert().from(from).possibilities();
  getCurrencyCodes = () => Array.from(new Set(Object.keys(currencyToSymbolMap)));
  getCurrencySymbol = currencyCode => getSymbolFromCurrency(currencyCode);
}