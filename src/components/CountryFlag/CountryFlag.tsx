import './CountryFlag.scss';
import clsx from 'clsx';
import * as Flags from 'country-flag-icons/react/3x2';
import type { CountryCode } from 'libphonenumber-js';

type CountryFlagProps = {
  countryCode: CountryCode;
  title?: string;
  className?: string;
};

type FlagComponent = React.ComponentType<{
  title?: string;
  className?: string;
}>;

const flagComponents = Flags as Record<string, FlagComponent | undefined>;

export default function CountryFlag({ countryCode, title, className }: CountryFlagProps) {
  const Flag = flagComponents[countryCode];

  if (!Flag) {
    return <span className={clsx('country-flag', className)} aria-hidden="true" />;
  }

  return <Flag title={title} className={clsx('country-flag', className)} />;
}
