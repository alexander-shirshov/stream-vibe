import './Feedback.scss';
import { useState } from 'react';
import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';

import FormLabel from '@/components/FormLabel';

import { useLanguage } from '@/i18n/LanguageProvider';
import CharsCounter from '@/components/CharsCounter';
import Checkbox from '@/components/Checkbox';
import LinkButton from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import PhoneInput, { type PhoneInputValue } from '@/components/PhoneInput';

import { getLocale, type Language } from '@/i18n/types';

const DEFAULT_PHONE_COUNTRY_BY_LANGUAGE: Record<Language, CountryCode> = {
  ru: 'RU',
  en: 'US',
};
function getDefaultPhoneValue(language: Language): PhoneInputValue {
  const countryCode = DEFAULT_PHONE_COUNTRY_BY_LANGUAGE[language];

  return {
    countryCode,
    callingCode: getCountryCallingCode(countryCode),
    nationalNumber: '',
    e164: '',
    isValid: false,
  };
}

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 800;

export default function Feedback() {
  const titleId = 'feedback-title';
  const { t, language } = useLanguage();
  const locale = getLocale(language);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState<PhoneInputValue>(() => getDefaultPhoneValue(language));

  const trimmedName = firstName.trim();
  const trimmedMessage = message.trim();

  const isNameValid = trimmedName.length >= MIN_NAME_LENGTH && /\p{L}/u.test(trimmedName);
  const isTextValid =
    trimmedMessage.length >= MIN_MESSAGE_LENGTH && trimmedMessage.length <= MAX_MESSAGE_LENGTH;

  const validationRules = [
    {
      name: 'phone',
      isInvalid: () => !phone.nationalNumber.trim() || !phone.isValid,
      getMessage: () =>
        !phone.nationalNumber.trim()
          ? t('supportPage.form.phone.noPhoneError')
          : t('supportPage.form.phone.invalidPhoneError'),
    },
    {
      name: 'firstName',
      isInvalid: () => !isNameValid,
      getMessage: () => t('supportPage.form.name.invalidError'),
    },
    {
      name: 'email',
      isInvalid: () => !email.trim(),
      getMessage: () => t('supportPage.form.email.noEmailError'),
    },

    {
      name: 'message',
      isInvalid: () => !isTextValid,
      getMessage: () => t('supportPage.form.message.invalidError'),
    },
    {
      name: 'agreement',
      isInvalid: () => !agreed,
      getMessage: () => t('supportPage.form.agreement.agreementError'),
    },
  ] as const;
  type FeedbackErrorField = (typeof validationRules)[number]['name'];

  const [activeError, setActiveError] = useState<{
    field: FeedbackErrorField;
    message: string;
  } | null>(null);

  const phoneErrorMessage = activeError?.field === 'phone' ? activeError.message : undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const firstInvalidRule = validationRules.find(rule => rule.isInvalid());

    if (firstInvalidRule) {
      setActiveError({
        field: firstInvalidRule.name,
        message: firstInvalidRule.getMessage(),
      });

      return;
    }

    setActiveError(null);

    console.log({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
  }

  function handleCheckboxCheck(event: React.ChangeEvent<HTMLInputElement>): void {
    setAgreed(event.target.checked);
  }

  return (
    <section className="feedback container" aria-labelledby={titleId}>
      <div className="feedback__body">
        <div className="feedback__info">
          <h1 className="feedback__title h2" id={titleId}>
            {t('supportPage.heading')}
          </h1>
          <div className="feedback__description">
            <p>{t('supportPage.description')}</p>
          </div>
        </div>
        <img className="feedback__image" src="/src/assets/images/support/1.png" loading="lazy" />
      </div>
      <form className="feedback__form" onSubmit={handleSubmit} noValidate>
        <FormLabel
          label={t('supportPage.form.name.label')}
          required
          className="feedback__field"
          htmlFor="first-name"
        >
          <input
            id="first-name"
            className="feedback__input"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder="Van"
          />
        </FormLabel>

        <FormLabel
          label={t('supportPage.form.lastName.label')}
          className="feedback__field"
          htmlFor="last-name"
        >
          <input
            id="last-name"
            className="feedback__input"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            placeholder="Darkholme"
          />
        </FormLabel>

        <FormLabel
          label={t('supportPage.form.email.label')}
          required
          className="feedback__field"
          htmlFor="email"
        >
          <input
            id="email"
            className="feedback__input"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="dungeon@master.com"
          />
        </FormLabel>

        <FormLabel
          label={t('supportPage.form.phone.label')}
          required
          className="feedback__field"
          htmlFor="phone"
        >
          <Tooltip
            className="feedback__phone-tooltip"
            message={phoneErrorMessage}
            variant="error"
            direction="bottom-right"
            isActive={Boolean(phoneErrorMessage)}
          >
            <PhoneInput
              id="phone"
              name="phone"
              value={phone}
              onChange={setPhone}
              onFocus={() => {
                if (activeError?.field === 'phone') {
                  setActiveError(null);
                }
              }}
              isInvalid={Boolean(phoneErrorMessage)}
              required
              locale={locale}
              placeholder="999 999 99-99"
              countrySearchPlaceholder={t('supportPage.form.phone.countryPlaceholder')}
              countryEmptyMessage={t('supportPage.form.phone.countryEmptyMessage')}
            />
          </Tooltip>
        </FormLabel>

        <FormLabel
          label={t('supportPage.form.message.label')}
          required
          className={`feedback__field feedback__field--wide`}
          htmlFor="message"
        >
          <textarea
            id="message"
            className="feedback__textarea"
            value={message}
            onChange={event => setMessage(event.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={t('supportPage.form.message.placeholder')}
          />
          <CharsCounter
            currentLength={trimmedMessage.length}
            maxLength={MAX_MESSAGE_LENGTH}
            minLength={MIN_MESSAGE_LENGTH}
          />
        </FormLabel>

        <div className="feedback__field feedback__field--wide feedback__field--actions">
          <Checkbox
            className="feedback__field-agreement"
            label={t('supportPage.agreement')}
            checked={agreed}
            onChange={handleCheckboxCheck}
            isRequired
          />
          <LinkButton mode="button" type="submit" customClass="feedback__form-submit-button">
            {t('supportPage.submit')}
          </LinkButton>
        </div>
      </form>
    </section>
  );
}
