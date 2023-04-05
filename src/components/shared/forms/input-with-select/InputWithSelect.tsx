import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { Fragment, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  type IInputFieldWithSelectComponentProps,
  type ISingleSelect,
} from './InputWishSelect.types';

const InputWithSelect = forwardRef<
  HTMLInputElement,
  IInputFieldWithSelectComponentProps
>(
  (
    {
      label,
      containerClassName,
      inputProps,
      inputClassName,
      onChange,
      selectOptions,
      defaultOption,
    },
    ref
  ) => {
    const [selected, setSelected] = useState(defaultOption || selectOptions[0]);

    const handleSelectChange = (newValue: ISingleSelect) => {
      setSelected(newValue);
      onChange?.(newValue);
    };

    return (
      <div className={containerClassName}>
        {!!label && <label className="mb-1 block">{label}</label>}

        <div className="flex items-center gap-[1px] rounded-[4px]  border focus:border-blue-brand">
          <input
            type="number"
            id={label}
            className={twMerge(
              'flex-1 rounded-[4px] rounded-r-none border-gray-300 text-gray-900 focus:border-blue-brand',
              inputClassName
            )}
            ref={ref}
            {...inputProps}
          />
          <Listbox value={selected} onChange={handleSelectChange}>
            <div className="relative mt-1">
              <Listbox.Button className="relative min-w-[80px] cursor-default border-gray-300 bg-white py-2 pl-3 pr-6 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected?.label}</span>
                <span
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  aria-hidden="true"
                >
                  <Icon icon="bi:chevron-down" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {selectOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none px-2 py-2 ${
                          active ? 'bg-blue-brand text-white' : 'text-gray-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.label}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    );
  }
);

InputWithSelect.displayName = 'InputWithSelect';

export default InputWithSelect;
