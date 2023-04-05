import CardWithTitle from '@/components/shared/card-with-title';
import InputField from '@/components/shared/forms/input-field';
import { convertCurrencyAmount } from '@/utils/client/convert-currency';
import { Icon } from '@iconify/react';
import { useState, type ChangeEvent } from 'react';
import { converterDatas, type ICurrency } from './ConverterForm.datas';

const ConverterForm = () => {
  const [firstCurrency, setFirstCurrency] = useState<ICurrency>(
    converterDatas.currency[0] as ICurrency
  );

  const [secondCurrency, setSecondCurrency] = useState<ICurrency>(
    converterDatas.currency[1] as ICurrency
  );

  const [valueOne, setValueOne] = useState(0);
  const [valueTwo, setValueTwo] = useState(0);

  /**
   * A function that swaps the current values of the first and second currency states and updates the converted value of the second input field based on the exchange rate of the two currencies.
   **/
  const handleSwapButtonClick = () => {
    const currentFirstCurrency = firstCurrency;
    const currentSecondCurrency = secondCurrency;

    setSecondCurrency(currentFirstCurrency);
    setFirstCurrency(currentSecondCurrency);

    setValueTwo(
      Number(
        convertCurrencyAmount({
          amount: valueOne,
          fromCurrencyAmount: currentSecondCurrency.value,
          toCurrencyAmount: currentFirstCurrency.value,
        }).toFixed(2)
      )
    );
  };

  /**
   * Event handler function for when the first input field's value changes. Updates the state for the first input value and calculates the converted value of the second input field based on the exchange rate of the two currencies.
   * @param {ChangeEvent<HTMLInputElement>} e - The event object representing the input change event.
   */
  const handleValueOneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputOneValue = Number(e.target.value);
    setValueOne(inputOneValue);
    setValueTwo(
      Number(
        convertCurrencyAmount({
          amount: inputOneValue,
          fromCurrencyAmount: firstCurrency.value,
          toCurrencyAmount: secondCurrency.value,
        }).toFixed(2)
      )
    );
  };

  /**
   * Event handler function for when the second input field's value changes. Updates the state for the second input value and calculates the converted value of the first input field based on the exchange rate of the two currencies.
   * @param {ChangeEvent<HTMLInputElement>} e - The event object representing the input change event.
   */
  const handleValueTwoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTwoValue = Number(e.target.value);
    setValueTwo(inputTwoValue);
    setValueOne(
      Number(
        convertCurrencyAmount({
          amount: inputTwoValue,
          fromCurrencyAmount: secondCurrency.value,
          toCurrencyAmount: firstCurrency.value,
        }).toFixed(2)
      )
    );
  };

  return (
    <>
      <CardWithTitle title="NEP/BUSD Converter">
        <div className="mb-4">
          <InputField
            inputClassName="w-full"
            label={firstCurrency.name}
            inputProps={{
              type: 'number',
              value: valueOne,
              onFocus: (e) => e.target.select(),
              onChange: handleValueOneChange,
            }}
          />
        </div>
        <button
          aria-label="Swap Currency"
          className="mx-auto my-2 block"
          onClick={handleSwapButtonClick}
        >
          <Icon icon="charm:swap-vertical" hFlip={true} width={'24'} />
        </button>
        <div>
          <InputField
            inputClassName="w-full"
            label={secondCurrency.name}
            inputProps={{
              type: 'number',
              value: valueTwo,
              onFocus: (e) => e.target.select(),
              onChange: handleValueTwoChange,
            }}
          />
        </div>
      </CardWithTitle>
    </>
  );
};

export default ConverterForm;
