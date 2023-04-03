import { twMerge } from 'tailwind-merge';

interface IDefaultCardComponentProps {
  children: React.ReactNode;
  className?: string;
}

const DefaultCard = ({ children, className }: IDefaultCardComponentProps) => {
  return (
    <div
      className={twMerge(
        'rounded-md bg-gray-800 px-12 py-16 shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};

export default DefaultCard;
