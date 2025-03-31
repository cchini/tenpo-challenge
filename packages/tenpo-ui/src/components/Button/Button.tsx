import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import css from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * ButtonProps defines the properties for the Button component.
 */
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** The content to be rendered inside the button */
  children: ReactNode | string;
  /** Custom class name for additional styling */
  className?: string;
  /** Defines the visual style of the button */
  variant?: ButtonVariant;
}

/**
 * Button component
 *
 * A reusable button component that supports different variants and styles.
 * It uses React.memo with a custom comparison function to avoid unnecessary re-renders.
 */
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
        data-testid="tenpo-ui-button"
        className={cx(css.button, className, css[`button__${variant}`])}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
  /**
   * Custom comparison function for React.memo to prevent unnecessary re-renders.
   * It checks if the className, variant, type, and children have changed.
   */
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
