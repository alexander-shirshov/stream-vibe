import './Feedback.scss';
import { useState } from 'react';
import clsx from 'clsx';
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPPORT_FORM_SUBMITTED_KEY = 'streamVibe.supportFormSubmitted';

type FeedbackSubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

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
  const [submitStatus, setSubmitStatus] = useState<FeedbackSubmitStatus>(() =>
    sessionStorage.getItem(SUPPORT_FORM_SUBMITTED_KEY) === 'true' ? 'success' : 'idle'
  );

  const isSubmitting = submitStatus === 'submitting';
  const isSubmitted = submitStatus === 'success';
  const isSubmitFailed = submitStatus === 'error';

  const trimmedName = firstName.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const isNameValid = trimmedName.length >= MIN_NAME_LENGTH && /\p{L}/u.test(trimmedName);
  const isEmailValid = EMAIL_PATTERN.test(trimmedEmail);
  const isTextValid =
    trimmedMessage.length >= MIN_MESSAGE_LENGTH && trimmedMessage.length <= MAX_MESSAGE_LENGTH;

  const validationRules = [
    {
      name: 'firstName',
      isInvalid: () => !isNameValid,
      getMessage: () => t('supportPage.form.name.invalidError'),
    },
    {
      name: 'email',
      isInvalid: () => !trimmedEmail || !isEmailValid,
      getMessage: () =>
        !trimmedEmail
          ? t('supportPage.form.email.noEmailError')
          : t('supportPage.form.email.invalidEmailError'),
    },
    {
      name: 'phone',
      isInvalid: () => !phone.nationalNumber.trim() || !phone.isValid,
      getMessage: () =>
        !phone.nationalNumber.trim()
          ? t('supportPage.form.phone.noPhoneError')
          : t('supportPage.form.phone.invalidPhoneError'),
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

  function getErrorMessage(field: FeedbackErrorField): string | undefined {
    return activeError?.field === field ? activeError.message : undefined;
  }

  function clearErrorOnFocus(field: FeedbackErrorField): void {
    if (activeError?.field === field) {
      setActiveError(null);
    }
  }

  function resetForm(): void {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAgreed(false);
    setMessage('');
    setPhone(getDefaultPhoneValue(language));
    setActiveError(null);
  }

  const firstNameErrorMessage = getErrorMessage('firstName');
  const emailErrorMessage = getErrorMessage('email');
  const phoneErrorMessage = getErrorMessage('phone');
  const messageErrorMessage = getErrorMessage('message');
  const agreementErrorMessage = getErrorMessage('agreement');

  function handleSendAnotherMessage(): void {
    sessionStorage.removeItem(SUPPORT_FORM_SUBMITTED_KEY);
    resetForm();
    setSubmitStatus('idle');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
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
    setSubmitStatus('submitting');

    try {
      const feedbackPayload = {
        firstName: trimmedName,
        lastName: lastName.trim(),
        email: trimmedEmail,
        phone,
        message: trimmedMessage,
      };

      console.log(feedbackPayload);

      // TODO: заменить на реальный запрос к API
      // await sendFeedback(feedbackPayload);

      sessionStorage.setItem(SUPPORT_FORM_SUBMITTED_KEY, 'true');
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  }

  function handleCheckboxCheck(event: React.ChangeEvent<HTMLInputElement>): void {
    const isChecked = event.target.checked;

    setAgreed(isChecked);

    if (isChecked && activeError?.field === 'agreement') {
      setActiveError(null);
    }
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

      {isSubmitted ? (
        <div className="feedback__submit-result" role="status" aria-live="polite">
          <div className="feedback__submit-result-inner">
            <h2 className="feedback__submit-result-title h3">
              {t('supportPage.submitStatus.successTitle')}
            </h2>

            <p className="feedback__submit-result-description">
              {t('supportPage.submitStatus.successDescription')}
            </p>

            <LinkButton
              mode="button"
              type="button"
              customClass="feedback__submit-result-button"
              onClick={handleSendAnotherMessage}
            >
              {t('supportPage.submitStatus.sendAnother')}
            </LinkButton>
          </div>
        </div>
      ) : (
        <form className="feedback__form" onSubmit={handleSubmit} noValidate>
          {isSubmitFailed && (
            <div className="feedback__submit-error" role="alert">
              <strong>{t('supportPage.submitStatus.errorTitle')}</strong>
              <span>{t('supportPage.submitStatus.errorDescription')}</span>
            </div>
          )}
          <FormLabel
            label={t('supportPage.form.name.label')}
            required
            className="feedback__field"
            htmlFor="first-name"
          >
            <Tooltip
              className="feedback__field-tooltip"
              message={firstNameErrorMessage}
              variant="error"
              direction="bottom-right"
              isActive={Boolean(firstNameErrorMessage)}
            >
              <input
                id="first-name"
                className={clsx('feedback__input', firstNameErrorMessage && 'is-invalid')}
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                onFocus={() => clearErrorOnFocus('firstName')}
                placeholder={t('supportPage.form.name.placeholder')}
                aria-invalid={Boolean(firstNameErrorMessage) || undefined}
              />
            </Tooltip>
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
            <Tooltip
              className="feedback__field-tooltip"
              message={emailErrorMessage}
              variant="error"
              direction="bottom-right"
              isActive={Boolean(emailErrorMessage)}
            >
              <input
                id="email"
                className={clsx('feedback__input', emailErrorMessage && 'is-invalid')}
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                onFocus={() => clearErrorOnFocus('email')}
                placeholder={t('supportPage.form.email.placeholder')}
                aria-invalid={Boolean(emailErrorMessage) || undefined}
              />
            </Tooltip>
          </FormLabel>

          <FormLabel
            label={t('supportPage.form.phone.label')}
            required
            className="feedback__field"
            htmlFor="phone"
          >
            <Tooltip
              className="feedback__field-tooltip"
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
            className="feedback__field feedback__field--wide"
            htmlFor="message"
          >
            <Tooltip
              className="feedback__field-tooltip"
              message={messageErrorMessage}
              variant="error"
              direction="bottom-right"
              isActive={Boolean(messageErrorMessage)}
            >
              <textarea
                id="message"
                className={clsx('feedback__textarea', messageErrorMessage && 'is-invalid')}
                value={message}
                onChange={event => setMessage(event.target.value)}
                onFocus={() => clearErrorOnFocus('message')}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder={t('supportPage.form.message.placeholder')}
                aria-invalid={Boolean(messageErrorMessage) || undefined}
              />
            </Tooltip>

            <CharsCounter
              currentLength={trimmedMessage.length}
              maxLength={MAX_MESSAGE_LENGTH}
              minLength={MIN_MESSAGE_LENGTH}
            />
          </FormLabel>

          <div className="feedback__field feedback__field--wide feedback__field--actions">
            <Tooltip
              className="feedback__agreement-tooltip"
              message={agreementErrorMessage}
              variant="error"
              direction="top-left"
              isActive={Boolean(agreementErrorMessage)}
            >
              <Checkbox
                className="feedback__field-agreement"
                label={t('supportPage.agreement')}
                checked={agreed}
                onChange={handleCheckboxCheck}
                isRequired
              />
            </Tooltip>
            <LinkButton
              mode="button"
              type="submit"
              customClass="feedback__form-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('supportPage.submitStatus.sending') : t('supportPage.submit')}
            </LinkButton>
          </div>
        </form>
      )}
    </section>
  );
}
