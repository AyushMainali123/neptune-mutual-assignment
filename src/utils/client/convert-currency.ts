interface IConvertCurrency {
  amount: number;
  fromCurrencyAmount: number;
  toCurrencyAmount: number;
}

/**
 * Converts an amount of currency from one currency to another based on their exchange rates.
 * @param {Object} IConvertCurrency - An object containing the amount to convert, the exchange rate of the currency to convert from, and the exchange rate of the currency to convert to.
 * @param {number} IConvertCurrency.amount - The amount of currency to convert.
 * @param {number} IConvertCurrency.fromCurrencyAmount - The exchange rate of the currency to convert from, relative to a standard value.
 * @param {number} IConvertCurrency.toCurrencyAmount - The exchange rate of the currency to convert to, relative to a standard value.
 * @returns {number} - The converted amount of currency.
 */
export const convertCurrencyAmount = ({
  amount,
  fromCurrencyAmount,
  toCurrencyAmount,
}: IConvertCurrency) => {
  const exchangeRate = toCurrencyAmount / fromCurrencyAmount;
  const convertedAmount = amount * exchangeRate;
  return convertedAmount;
};
