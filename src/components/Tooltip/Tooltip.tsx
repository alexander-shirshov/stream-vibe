/*

const tooltipTimeouts = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

// Доступные направления тултипа
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

type TooltipOptions = {
  message: string;
  direction?: TooltipDirection;
  variant?: TooltipVariant;
  autoHide?: boolean;
  duration?: number;
};

export function handleTooltip(
  elementRef: React.RefObject<HTMLElement | null>,
  options: TooltipOptions
) {
  if (!elementRef.current) {
    return;
  }
  const el = elementRef.current;

  // 1. Очищаем предыдущий таймаут
  const existingTimeout = tooltipTimeouts.get(el);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }

  // 2. Удаляем старые классы тултипов
  removeTooltipClasses(el);

  // 3. Добавляем стили
  el.classList.add('input-error');
  el.classList.add(`input-error--${direction}`);
  el.setAttribute('data-tooltip', message);

  // 4. Устанавливаем новый таймаут
  const newTimeout = setTimeout(() => {
    removeTooltip(elementRef);
    tooltipTimeouts.delete(el); // Удаляем из хранилища
  }, 3500);

  // 5. Сохраняем ID таймаута
  tooltipTimeouts.set(el, newTimeout);
}

export function removeTooltip(elementRef) {
  if (!elementRef.current) return;

  const el = elementRef.current;

  // Очищаем таймаут если есть
  const timeoutId = tooltipTimeouts.get(el);
  if (timeoutId) {
    clearTimeout(timeoutId);
    tooltipTimeouts.delete(el);
  }

  removeTooltipClasses(el);
  el.removeAttribute('data-tooltip');
}

// Вспомогательная функция для удаления всех классов тултипов
function removeTooltipClasses(element) {
  const classesToRemove = [
    'input-error',
    'input-error--top',
    'input-error--bottom',
    'input-error--left',
    'input-error--right',
    'input-error--top-left',
    'input-error--top-right',
    'input-error--bottom-left',
    'input-error--bottom-right',
  ];

  element.classList.remove(...classesToRemove);
}
*/
