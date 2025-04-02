import React, { DetailedHTMLProps, InputHTMLAttributes, FC } from 'react';
import cx from 'classnames';
import css from './input.module.scss';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /** Custom class name for additional styling */
  className?: string;
}

/**
 * A reusable Input component with custom styling.
 * This component wraps a standard HTML input element inside a styled container.
 *
 * @component
 * @example
 * ```tsx
 * <Input className="custom-input" placeholder="Enter text" />
 * ```
 *
 * @param {InputProps} props - The properties of the Input component.
 * @returns {JSX.Element} A styled input field.
 */
const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <section className={cx(css.input, className)}>
      <input className={css.input_field} {...props} />
    </section>
  );
};

export default Input;
