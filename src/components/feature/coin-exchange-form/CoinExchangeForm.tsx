import CardWithTitle from '@/components/shared/card-with-title';
import { type ISingleSelect } from '@/components/shared/forms/input-with-select/InputWishSelect.types';
import InputWithSelect from '@/components/shared/forms/input-with-select/InputWithSelect';
import tokenList from '@/datas/token-list.json';
import { api } from '@/utils/api';
import { convertCurrencyAmount } from '@/utils/client/convert-currency';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

const STALE_TIME = 0; // Making the stale time for api equal to 0 Milli Seconds

const tokenListForListInput = tokenList.map((token) => ({
  label: token.ticker,
  value: token.address,
}));

const CoinExchangeForm = () => {
  // These state hooks stores current selected currency of inputs.
  const [firstCurrency, setFirstCurrency] = useState<ISingleSelect>(
    tokenListForListInput[0] as ISingleSelect
  );

  const [secondCurrency, setSecondCurrency] = useState<ISingleSelect>(
    tokenListForListInput[1] as ISingleSelect
  );

  // These states are used to store and manipulate the values of inputs.
  const [valueOne, setValueOne] = useState(0);
  const [valueTwo, setValueTwo] = useState(0);

  // These states consists of current value in USD of the selected currency.
  const [currencyOneValue, setCurrencyOneValue] = useState(1);
  const [currencyTwoValue, setCurrencyTwoValue] = useState(1);

  // This section is used to fetch the currencyOneValue when the value of `firstCurrency` updates.
  const { isLoading: isFirstCurrencyLoading } =
    api.tokenMarketPrice.getTokenPrice.useQuery(
      { address: firstCurrency.value },
      {
        staleTime: STALE_TIME,

        // On successful response from the server, update the currencyOne value accordingly.
        // Also, update the respective value of valueOne and valueTwo after the change in currency.
        onSuccess: (responseData) => {
          const updatedValueTwo = convertCurrencyAmount({
            amount: valueOne,
            fromCurrencyAmount: responseData.usdPrice,
            toCurrencyAmount: currencyTwoValue,
          });
          setCurrencyOneValue(responseData.usdPrice);
          setValueOne(valueOne);
          setValueTwo(Number(updatedValueTwo.toFixed(2)));
        },

        // On error, show the toast indicating the error.
        onError: (error) => {
          toast.error(
            `Couldnot update the currency value: ${
              error.data?.code || error.message
            }`
          );
          console.error(error);
        },
      }
    );

  // This section is used to fetch the currencyTwoValue when the value of `secondCurrency` updates.
  const { isLoading: isSecondCurrencyLoading } =
    api.tokenMarketPrice.getTokenPrice.useQuery(
      { address: secondCurrency.value },
      {
        staleTime: STALE_TIME,

        // On successful response from the server, update the currencyTwo value accordingly.
        // Also, update the respective value of valueOne and valueTwo after the change in currency.
        onSuccess: (responseData) => {
          const updatedValueOne = convertCurrencyAmount({
            amount: valueTwo,
            fromCurrencyAmount: responseData.usdPrice,
            toCurrencyAmount: currencyOneValue,
          });
          setCurrencyTwoValue(responseData.usdPrice);
          setValueTwo(valueTwo);
          setValueOne(Number(updatedValueOne.toFixed(2)));
        },

        // On error, show the toast indicating the error.
        onError: (error) => {
          toast.error(
            `Couldnot update the currency value: ${
              error.data?.code || error.message
            }`
          );
          console.error(error);
        },
      }
    );

  /**
   * Handles the change event of the first input element.
   * Update the valueOne. Also, update the valueTwo according to the exchange rate of currencies
   * @param {ChangeEvent<HTMLInputElement>} e - The change event of the input element.
   * @returns {void}
   */
  const handleValueOneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setValueOne(inputValue);
    const convertedAmount = convertCurrencyAmount({
      amount: inputValue,
      fromCurrencyAmount: currencyOneValue,
      toCurrencyAmount: currencyTwoValue,
    });
    setValueTwo(Number(convertedAmount.toFixed(2)));
  };

  /**
   * Handles the change event of the second input element.
   * Update the valueTwo. Also, update the valueOne according to the exchange rate of currencies
   * @param {ChangeEvent<HTMLInputElement>} e - The change event of the input element.
   * @returns {void}
   */
  const handleValueTwoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setValueTwo(inputValue);
    const convertedAmount = convertCurrencyAmount({
      amount: inputValue,
      fromCurrencyAmount: currencyTwoValue,
      toCurrencyAmount: currencyOneValue,
    });
    setValueOne(Number(convertedAmount.toFixed(2)));
  };

  /**
   *  Handles the change event of the currency selector.
   *  This function updates corresponding input currency accordingly.
   *  @param {ISingleSelect} newValue - The new selected currency.
   *  @param {'first' | 'second'} inputType - The type of input the currency selector corresponds to.
   * @returns {void}
   */
  const handleCurrencyChange = (
    newValue: ISingleSelect,
    inputType: 'first' | 'second'
  ) => {
    if (inputType === 'first') {
      setFirstCurrency(newValue);
      return;
    }
    setSecondCurrency(newValue);
  };

  return (
    <CardWithTitle title="Coin Exchange">
      <div className="mb-4">
        <InputWithSelect
          selectOptions={tokenListForListInput}
          inputClassName="w-full"
          defaultOption={tokenListForListInput[0]}
          label={firstCurrency.label}
          onChange={(newValue) => handleCurrencyChange(newValue, 'first')}
          inputProps={{
            type: 'number',
            value: valueOne,
            onFocus: (e) => e.target.select(),
            onChange: handleValueOneChange,
            disabled: isFirstCurrencyLoading || isSecondCurrencyLoading,
          }}
        />
      </div>

      <div>
        <InputWithSelect
          selectOptions={tokenListForListInput}
          inputClassName="w-full"
          defaultOption={tokenListForListInput[1]}
          onChange={(newValue) => handleCurrencyChange(newValue, 'second')}
          label={secondCurrency.label}
          inputProps={{
            type: 'number',
            value: valueTwo,
            onFocus: (e) => e.target.select(),
            onChange: handleValueTwoChange,
            disabled: isFirstCurrencyLoading || isSecondCurrencyLoading,
          }}
        />
      </div>
    </CardWithTitle>
  );
};

export default CoinExchangeForm;
