import './FormLabel.scss';
import clsx from 'clsx';
import { useLanguage } from '@/i18n/LanguageProvider';

type FormLabelProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
};

export default function FormLabel({
  label,
  required,
  className,
  htmlFor,
  children,
}: FormLabelProps) {
  const { t } = useLanguage();

  return (
    <label
      className={clsx('form-label', className)}
      htmlFor={htmlFor}
      title={required ? t('formLabel.required') : undefined}
    >
      <span className="form-label__title">
        {label}

        {required && (
          <span className="form-label__required" aria-hidden="true">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}
