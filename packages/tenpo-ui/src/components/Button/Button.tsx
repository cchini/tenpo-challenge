import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import css from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** Render content button */
  children: ReactNode | string;
  /** Overwrite className */
  className?: string;
  /** Use the variant prop to change the visual style of the Button */
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = React.memo(
  ({
    children,
    className = '',
    variant = 'primary',
    type = 'button',
    ...props
  }) => {
    return (
      <button
        className={cx(css.button, className, css[`button__${variant}`])}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.className !== nextProps.className) return false;
    if (prevProps.variant !== nextProps.variant) return false;
    if (prevProps.type !== nextProps.type) return false;

    if (
      React.isValidElement(prevProps.children) &&
      React.isValidElement(nextProps.children)
    ) {
      return prevProps.children.key === nextProps.children.key;
    }

    return prevProps.children === nextProps.children;
  },
);

export default Button;
