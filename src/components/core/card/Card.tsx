import DefaultCard from './default';

interface ICardComponentProps {
  variant?: 'default';
  className?: string;
  children: React.ReactNode;
}

const Card = ({
  variant = 'default',
  className,
  children,
}: ICardComponentProps) => {
  if (variant === 'default') {
    return <DefaultCard className={className}>{children}</DefaultCard>;
  }

  // The control never reaches this step.
  // Return empty object as never. This prevents type error.
  return {} as never;
};

export default Card;
