import React from 'react';
import type { FC, ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../Icons/Icon';
import css from './card.module.scss';

/**
 * CardProps defines the properties for the Card component.
 */
export interface CardProps {
  /** The content to be displayed inside the card */
  children?: ReactNode | string;
  /** Custom class name for additional styling */
  className?: string;
  /** Defines the state of the card, currently only supports 'error' */
  state: 'error';
  /** The title of the card, which can be a string or a React element */
  title: ReactElement | string;
}

/**
 * Card Component
 *
 * A reusable card component that visually represents an error state.
 * It displays an error icon and the provided content.
 */
const Card: FC<CardProps> = ({
  state = 'error',
  children,
  className,
}: CardProps) => {
  return (
    <article
      className={cx(css.card, state && css?.[`card__${state}`], className)}
    >
      <section className={css.card_main}>
        {/* Error icon */}
        <Icon className={css.card_main__icon} name="circle-cross-fill" />
        {/* Main content */}
        {children}
      </section>
    </article>
  );
};

export default Card;
