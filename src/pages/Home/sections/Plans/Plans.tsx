import Section from '@/layouts/Section';
import { useLanguage } from '@/i18n/LanguageProvider';
import Grid from '@/components/Grid';
import { planGroups } from '@/config/planItems';
import PlanCard from '@/components/PlanCard';

export default function Plans() {
  const { t } = useLanguage();
  const activePlanGroup = planGroups.find(group => group.isActive) ?? planGroups[0];

  return (
    <Section
      title={t('plans.title')}
      titleId="plans-id"
      id="pricing"
      description={t('plans.descr')}
    >
      <Grid columns={3}>
        {activePlanGroup.items.map(item => (
          <PlanCard {...item} key={item.itemKey}></PlanCard>
        ))}
      </Grid>
    </Section>
  );
}
