import { DetailedHTMLProps, InputHTMLAttributes, FC } from 'react';
import cx from 'classnames';
import css from './input.module.scss';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /** Overwrite className */
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <section className={cx(css.input, className)}>
      <input className={css.input_field} {...props} />
    </section>
  );
};

export default Input;
