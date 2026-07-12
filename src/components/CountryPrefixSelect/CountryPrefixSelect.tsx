import './CountryPrefixSelect.scss';
import clsx from 'clsx';
import { useEffect, useCallback, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import type { PhoneCountry } from '@/constants/countries';
import CountryFlag from '@/components/CountryFlag';

type CountryPrefixSelectProps = {
  value: PhoneCountry;
  options: PhoneCountry[];
  onChange: (country: PhoneCountry) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
};

function normalizeSearchValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\+/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
function isNumericSearch(value: string): boolean {
  return /^\d+$/.test(value);
}
function getSearchRank(country: PhoneCountry, searchQuery: string): number | null {
  const normalizedName = normalizeSearchValue(country.name);
  const normalizedCountryCode = normalizeSearchValue(country.countryCode);
  const normalizedCallingCode = normalizeSearchValue(country.callingCode);

  if (isNumericSearch(searchQuery)) {
    if (normalizedCallingCode === searchQuery) {
      return 0;
    }

    if (normalizedCallingCode.startsWith(searchQuery)) {
      return 1;
    }

    if (normalizedCallingCode.includes(searchQuery)) {
      return 2;
    }

    return null;
  }

  if (normalizedCountryCode === searchQuery) {
    return 0;
  }

  if (normalizedName === searchQuery) {
    return 1;
  }

  if (normalizedCountryCode.startsWith(searchQuery)) {
    return 2;
  }

  if (normalizedName.startsWith(searchQuery)) {
    return 3;
  }

  const hasWordStartingWithQuery = normalizedName
    .split(/\s+/)
    .some(word => word.startsWith(searchQuery));

  if (hasWordStartingWithQuery) {
    return 4;
  }

  if (normalizedName.includes(searchQuery)) {
    return 5;
  }

  return null;
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
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);

  const normalizedSearchQuery = normalizeSearchValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!normalizedSearchQuery) {
      return options;
    }

    return options
      .map((country, index) => ({
        country,
        index,
        rank: getSearchRank(country, normalizedSearchQuery),
      }))
      .filter(
        (item): item is { country: PhoneCountry; index: number; rank: number } => item.rank !== null
      )
      .sort((a, b) => {
        if (a.rank !== b.rank) {
          return a.rank - b.rank;
        }

        return a.index - b.index;
      })
      .map(({ country }) => country);
  }, [normalizedSearchQuery, options]);

  const activeOption = activeOptionIndex >= 0 ? filteredOptions[activeOptionIndex] : undefined;

  const closeDropdown = useCallback(() => {
    setIsExpanded(false);
    setSearchQuery('');
    setActiveOptionIndex(-1);
  }, []);

  function getOptionId(countryCode: string): string {
    return `${listboxId}-${countryCode}`;
  }

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

  function moveActiveOption(step: 1 | -1): void {
    if (filteredOptions.length === 0) {
      return;
    }

    setActiveOptionIndex(currentIndex => {
      if (currentIndex === -1) {
        return step === 1 ? 0 : filteredOptions.length - 1;
      }

      return (currentIndex + step + filteredOptions.length) % filteredOptions.length;
    });
  }

  function handleRootKeyDown(event: ReactKeyboardEvent<HTMLDivElement>): void {
    if (disabled) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!isExpanded) {
        setIsExpanded(true);
        return;
      }

      moveActiveOption(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!isExpanded) {
        setIsExpanded(true);
        return;
      }

      moveActiveOption(-1);
      return;
    }

    if (event.key === 'Enter' && isExpanded && activeOption) {
      event.preventDefault();
      handleCountrySelect(activeOption);
      return;
    }

    if (event.key === 'Escape' && isExpanded) {
      event.preventDefault();
      closeDropdown();
      buttonRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    if (normalizedSearchQuery) {
      setActiveOptionIndex(filteredOptions.length > 0 ? 0 : -1);
      listboxRef.current?.scrollTo({ top: 0 });

      return;
    }

    const selectedOptionIndex = filteredOptions.findIndex(
      country => country.countryCode === value.countryCode
    );

    setActiveOptionIndex(selectedOptionIndex >= 0 ? selectedOptionIndex : 0);
  }, [filteredOptions, isExpanded, normalizedSearchQuery, value.countryCode]);

  useEffect(() => {
    if (!isExpanded || activeOptionIndex < 0) {
      return;
    }

    optionRefs.current[activeOptionIndex]?.scrollIntoView({
      block: 'nearest',
    });
  }, [activeOptionIndex, isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const focusFrameId = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    function handleDocumentPointerDown(event: PointerEvent): void {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    document.addEventListener('pointerdown', handleDocumentPointerDown);

    return () => {
      window.cancelAnimationFrame(focusFrameId);
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
    };
  }, [closeDropdown, isExpanded]);

  return (
    <div className="country-prefix-select" ref={rootRef} onKeyDown={handleRootKeyDown}>
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
          <CountryFlag countryCode={value.countryCode} title={value.name} />
        </span>
        <span className="country-prefix-select__calling-code">+{value.callingCode}</span>
        <span className="country-prefix-select__arrow" aria-hidden="true" />
      </button>

      {isExpanded && (
        <div className="country-prefix-select__dropdown">
          <div className="country-prefix-select__search">
            <input
              className="country-prefix-select__search-control"
              ref={searchInputRef}
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              autoComplete="off"
              aria-controls={listboxId}
              aria-activedescendant={
                activeOption ? getOptionId(activeOption.countryCode) : undefined
              }
            />
          </div>

          <div
            className="country-prefix-select__options"
            id={listboxId}
            role="listbox"
            aria-label="Country calling code"
            ref={listboxRef}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((country, index) => {
                const isSelected = country.countryCode === value.countryCode;
                const isActive = index === activeOptionIndex;

                return (
                  <button
                    className={clsx(
                      'country-prefix-select__option',
                      isSelected && 'is-selected',
                      isActive && 'is-active'
                    )}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    id={getOptionId(country.countryCode)}
                    key={country.countryCode}
                    tabIndex={-1}
                    ref={element => {
                      optionRefs.current[index] = element;
                    }}
                    onMouseEnter={() => setActiveOptionIndex(index)}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="country-prefix-select__option-flag" aria-hidden="true">
                      <CountryFlag countryCode={country.countryCode} title={country.name} />
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
