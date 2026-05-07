import Section from '@/layouts/Section';
import { useLanguage } from '@/i18n/LanguageProvider';
import Grid from '@/components/Grid';
import { deviceItems } from '@/config/deviceItems';
import DeviceCard from '@/components/DeviceCard';

export default function Devices() {
  const { t } = useLanguage();

  return (
    <Section
      title={t('devices.title')}
      titleId="devices-title"
      id="devices"
      description={t('devices.descr')}
      isActionsHiddenOnMobile
    >
      <Grid columns={3}>
        {deviceItems.map(item => (
          <DeviceCard key={item.device} {...item} />
        ))}
      </Grid>
    </Section>
  );
}
