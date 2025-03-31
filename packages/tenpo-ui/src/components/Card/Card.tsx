import type { FC, ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../Icons/Icon';
import css from './card.module.scss';

export interface CardProps {
  children?: ReactNode | string;
  className?: string;
  state: 'error';
  title: ReactElement | string;
}

const Card: FC<CardProps> = ({
  state = 'error',
  children,
  className,
}: CardProps) => {
  return (
    <article
      className={cx(css.card, state && css?.[`card__${state}`], className)}
    >
      <section className={css.card_mainRow}>
        <Icon className={css.iconState} name="circle-cross-fill" />
        <div className={css.mainInfo}>{children}</div>
      </section>
    </article>
  );
};

export default Card;
