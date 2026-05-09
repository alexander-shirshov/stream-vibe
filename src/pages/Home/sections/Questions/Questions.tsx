import Section from '@/layouts/Section';
import { useLanguage } from '@/i18n/LanguageProvider';
import LinkButton from '@/components/Button';
import type { ButtonNavLink } from '@/constants/navConfig';
import { questionItems } from '@/config/questionItems';
import AccordionGroup from '@/components/AccordionGroup';
import Accordion from '@/components/Accordion';

export default function Questions() {
  const { t } = useLanguage();

  const supportLink: ButtonNavLink = { route: 'support' };

  return (
    <Section
      title={t('questions.title')}
      titleId="questions-title"
      id="faq"
      description={t('questions.descr')}
      actions={
        <LinkButton mode="link" link={supportLink} customClass="button">
          {t('questions.action')}
        </LinkButton>
      }
    >
      <AccordionGroup columns={2}>
        {questionItems.map((question, index) => (
          <Accordion
            key={question}
            title={t(`questions.items.${question}.question`)}
            id={`question-${index}`}
            name="questions"
            isOpen={index === 0}
          >
            <p>{t(`questions.items.${question}.answer`)}</p>
          </Accordion>
        ))}
      </AccordionGroup>
    </Section>
  );
}
