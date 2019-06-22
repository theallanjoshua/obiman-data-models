import convert from 'convert-units';
import currencyToSymbolMap from 'currency-symbol-map/map';
import getSymbolFromCurrency from 'currency-symbol-map';

const measures = ['length', 'area', 'mass', 'volume'];

export default class Utils {
  getUnits = (from) => from ? convert().from(from).possibilities() : convert().list()
    .filter(({ measure }) => measures.indexOf(measure) > -1)
    .map(({ abbr }) => abbr);
  getCurrencyCodes = () => Array.from(new Set(Object.keys(currencyToSymbolMap)));
  getCurrencySymbol = currencyCode => getSymbolFromCurrency(currencyCode);
}