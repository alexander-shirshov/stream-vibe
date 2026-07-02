import { getId } from '@/utils/tabs';
import './Checkbox.scss';

import clsx from 'clsx';

type CheckboxProps = {
  className?: string;
  label: string;
  isRequired: boolean;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({
  className,
  label,
  isRequired,
  checked,
  onChange,
}: CheckboxProps) {
  const id = getId(label);
  return (
    <label className={clsx('checkbox', className)} htmlFor={id}>
      <input
        className="checkbox__input"
        id={id}
        type="checkbox"
        required={isRequired}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
