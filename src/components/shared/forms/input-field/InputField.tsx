import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface IInputFieldCOmponentProps {
  label?: string;
  containerClassName?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;
  inputClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, IInputFieldCOmponentProps>(
  ({ label, containerClassName, inputProps, inputClassName }, ref) => {
    return (
      <div className={containerClassName}>
        {!!label && <label htmlFor={label}>{label}</label>}
        <input
          ref={ref}
          id={label}
          className={twMerge('text-black', inputClassName)}
          {...inputProps}
        />
      </div>
    );
  }
);

InputField.displayName = 'Input Field';

export default InputField;
