import clsx from 'clsx';

export type TooltipDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type TooltipVariant = 'info' | 'error';

type TooltipElement = 'div' | 'span';

type TooltipProps = {
  children: React.ReactNode;
  message?: string;
  direction?: TooltipDirection;
  variant?: TooltipVariant;
  isActive?: boolean;
  className?: string;
  as?: TooltipElement;
};

export default function Tooltip({
  children,
  message,
  direction = 'top',
  variant = 'info',
  isActive = false,
  className,
  as: Component = 'div',
}: TooltipProps) {
  const hasMessage = Boolean(message?.trim());
  const shouldRenderMessage = hasMessage && (variant === 'info' || isActive);

  return (
    <Component
      className={clsx(
        'tooltip',
        `tooltip--${direction}`,
        `tooltip--${variant}`,
        isActive && shouldRenderMessage && 'is-active',
        !shouldRenderMessage && 'tooltip--empty',
        className
      )}
      data-tooltip={shouldRenderMessage ? message : undefined}
    >
      {children}
    </Component>
  );
}
