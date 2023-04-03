import { twMerge } from 'tailwind-merge';

interface IDefaultCardComponentProps {
  children: React.ReactNode;
  className?: string;
}

const DefaultCard = ({ children, className }: IDefaultCardComponentProps) => {
  return (
    <div
      className={twMerge('rounded-md bg-white px-4 py-6 shadow-lg', className)}
    >
      {children}
    </div>
  );
};

export default DefaultCard;
