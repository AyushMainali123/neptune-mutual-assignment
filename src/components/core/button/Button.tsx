import { Icon } from '@iconify/react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface IButtonComponentProps extends PropsWithChildren {
  buttonProps: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
  variant?: 'solid' | 'outlined';
  className?: string;
  isLoading?: boolean;
}

const solidButtonClassName =
  'bg-blue-brand border-[1px] border-blue-brand text-white hover:bg-blue-800';
const outlinedButtonClassName =
  'bg-white border-gray-400 border-[1px] text-zinc-950 hover:border-gray-900';

const Button = forwardRef<HTMLButtonElement, IButtonComponentProps>(
  (
    { variant = 'solid', className, buttonProps, children, isLoading = false },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'rounded-lg px-5 py-3 font-inter font-medium transition-all active:scale-95 disabled:cursor-not-allowed',
          variant === 'solid' && solidButtonClassName,
          variant === 'outlined' && outlinedButtonClassName,
          className
        )}
        {...buttonProps}
        disabled={buttonProps.disabled || isLoading}
      >
        <div className="mx-auto flex w-full items-center justify-center gap-2">
          <div>{children}</div>
          {isLoading && (
            <div className="animate-spin">
              <Icon icon="icomoon-free:spinner2" />
            </div>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
