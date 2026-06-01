import './Badge.scss';
import clsx from 'clsx';

export type BadgeVariant = 'default' | 'accent';

type BadgeProps = {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
};

export default function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <div
      className={clsx(
        className,
        'badge',
        `badge--${variant}`,
        variant === 'accent' && 'badge--big'
      )}
    >
      {children}
    </div>
  );
}
