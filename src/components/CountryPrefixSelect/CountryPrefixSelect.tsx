import './CountryPrefixSelect.scss';
import clsx from 'clsx';
import { useEffect, useCallback, useId, useMemo, useRef, useState } from 'react';

import type { PhoneCountry } from '@/constants/countries';

type CountryPrefixSelectProps = {
  value: PhoneCountry;
  options: PhoneCountry[];
  onChange: (country: PhoneCountry) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
};

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/^\+/, '');
}

export default function CountryPrefixSelect({
  value,
  options,
  onChange,
  searchPlaceholder = 'Search country or code',
  emptyMessage = 'No countries found',
  disabled,
}: CountryPrefixSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedSearchQuery = normalizeSearchValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!normalizedSearchQuery) {
      return options;
    }

    return options.filter(country => {
      const normalizedName = country.name.toLowerCase();
      const normalizedCountryCode = country.countryCode.toLowerCase();
      const normalizedCallingCode = country.callingCode.toLowerCase();

      return (
        normalizedName.includes(normalizedSearchQuery) ||
        normalizedCountryCode.includes(normalizedSearchQuery) ||
        normalizedCallingCode.includes(normalizedSearchQuery)
      );
    });
  }, [normalizedSearchQuery, options]);

  const closeDropdown = useCallback(() => {
    setIsExpanded(false);
    setSearchQuery('');
  }, []);

  function handleButtonClick(): void {
    if (isExpanded) {
      closeDropdown();
      return;
    }

    setIsExpanded(true);
  }

  function handleCountrySelect(country: PhoneCountry): void {
    onChange(country);
    closeDropdown();
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const focusFrameId = window.requestAnimationFrame(() => {
      const searchInput = searchInputRef.current;
      const dropdown = dropdownRef.current;

      if (!searchInput || !dropdown) {
        return;
      }

      searchInput.focus();
    });

    function handleDocumentPointerDown(event: PointerEvent): void {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    function handleDocumentKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        closeDropdown();
        buttonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      window.cancelAnimationFrame(focusFrameId);
    };
  }, [closeDropdown, isExpanded]);

  return (
    <div className="country-prefix-select" ref={rootRef}>
      <button
        className={clsx('country-prefix-select__button', isExpanded && 'is-expanded')}
        type="button"
        ref={buttonRef}
        disabled={disabled}
        aria-label={`${value.name}, +${value.callingCode}`}
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        aria-controls={listboxId}
        onClick={handleButtonClick}
      >
        <span className="country-prefix-select__flag" aria-hidden="true">
          {value.flag}
        </span>
        <span className="country-prefix-select__calling-code">+{value.callingCode}</span>
        <span className="country-prefix-select__arrow" aria-hidden="true" />
      </button>

      {isExpanded && (
        <div className="country-prefix-select__dropdown" id={listboxId} ref={dropdownRef}>
          <div className="country-prefix-select__search">
            <input
              className="country-prefix-select__search-control"
              ref={searchInputRef}
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              autoComplete="off"
            />
          </div>

          <div
            className="country-prefix-select__options"
            role="listbox"
            aria-label="Country calling code"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map(country => {
                const isSelected = country.countryCode === value.countryCode;

                return (
                  <button
                    className={clsx('country-prefix-select__option', isSelected && 'is-selected')}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    key={country.countryCode}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="country-prefix-select__option-flag" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="country-prefix-select__option-name">{country.name}</span>
                    <span className="country-prefix-select__option-code">
                      +{country.callingCode}
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="country-prefix-select__empty">{emptyMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
