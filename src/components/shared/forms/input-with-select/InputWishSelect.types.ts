import { type InputHTMLAttributes } from 'react';

export interface ISingleSelect {
  label: string;
  value: string;
}

export interface IInputFieldWithSelectComponentProps {
  label?: string;
  containerClassName?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;
  inputClassName?: string;
  selectOptions: ISingleSelect[];
  defaultOption?: ISingleSelect;
  onChange?: (_selectedOption: ISingleSelect) => void;
}
