export interface IModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel: string;
  containerClassName?: string;
  panelClassName?: string;
  showCloseIcon?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}
