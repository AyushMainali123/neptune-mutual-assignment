import { Dialog } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';
import { type IModalComponentProps } from './Modal.types';

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  containerClassName,
  panelClassName,
  showCloseIcon = true,
  ariaLabel,
  shouldCloseOnOverlayClick = false,
}: IModalComponentProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={
        shouldCloseOnOverlayClick
          ? onClose
          : () => {
              /** */
            }
      }
      className={containerClassName}
      aria-label={ariaLabel}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={twMerge(
            'relative w-full max-w-sm rounded bg-white px-10 py-8',
            panelClassName
          )}
        >
          {!!title && <Dialog.Title>{title}</Dialog.Title>}
          {showCloseIcon && (
            <button
              aria-label="Close modal"
              className="absolute right-6 top-6"
              onClick={onClose}
            >
              <Icon icon="mi:close" width={'20px'} />
            </button>
          )}
          {!!description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
