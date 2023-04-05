import CardWithTitle from '@/components/shared/card-with-title';
import { type ISingleSelect } from '@/components/shared/forms/input-with-select/InputWishSelect.types';
import InputWithSelect from '@/components/shared/forms/input-with-select/InputWithSelect';
import tokenList from '@/datas/token-list.json';
import { api } from '@/utils/api';
import { convertCurrencyAmount } from '@/utils/client/convert-currency';
import { useState, type ChangeEvent } from 'react';

const STALE_TIME = 0; // Making the stale time for api equal to 0 Milli Seconds

const tokenListForListInput = tokenList.map((token) => ({
  label: token.ticker,
  value: token.address,
}));

const CoinExchangeForm = () => {
  const [firstCurrency, setFirstCurrency] = useState<ISingleSelect>(
    tokenListForListInput[0] as ISingleSelect
  );

  const [secondCurrency, setSecondCurrency] = useState<ISingleSelect>(
    tokenListForListInput[1] as ISingleSelect
  );

  const [valueOne, setValueOne] = useState(0);
  const [valueTwo, setValueTwo] = useState(0);

  const [currencyOneValue, setCurrencyOneValue] = useState(1);
  const [currencyTwoValue, setCurrencyTwoValue] = useState(1);

  const { isLoading: isFirstCurrencyLoading } =
    api.tokenMarketPrice.getTokenPrice.useQuery(
      { address: firstCurrency.value },
      {
        staleTime: STALE_TIME,
        retry: 0,
        enabled: true,
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
        onError: (error) => {
          console.error(error);
        },
      }
    );

  const { isLoading: isSecondCurrencyLoading } =
    api.tokenMarketPrice.getTokenPrice.useQuery(
      { address: secondCurrency.value },
      {
        staleTime: STALE_TIME,
        retry: 0,
        enabled: true,
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
        onError: (error) => {
          console.error(error);
        },
      }
    );

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