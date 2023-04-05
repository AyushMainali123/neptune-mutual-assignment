import { type PropsWithChildren } from 'react';

interface ICardWithTitleComponentProps extends PropsWithChildren {
  title: string;
}

const CardWithTitle = ({ title, children }: ICardWithTitleComponentProps) => {
  return (
    <div>
      <h2 className="mb-5 font-manrope text-xl font-semibold text-zinc-950">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export default CardWithTitle;
