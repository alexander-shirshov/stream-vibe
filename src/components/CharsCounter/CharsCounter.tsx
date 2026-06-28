import './CharsCounter.scss';
import clsx from 'clsx';

type CharsCounterProps = {
  className?: string;
  currentLength: number;
  maxLength: number;
  minLength: number;
};
export default function CharsCounter({
  className,
  currentLength,
  maxLength,
  minLength,
}: CharsCounterProps) {
  return (
    <span
      className={clsx(
        'counter',
        className,
        currentLength <= minLength / 2 && `counter--alert ${className}--alert`,
        currentLength > minLength / 2 &&
          currentLength < minLength &&
          `counter--attention ${className}--attention`
      )}
    >
      {currentLength}/{maxLength}
    </span>
  );
}
