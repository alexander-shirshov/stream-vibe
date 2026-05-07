import './DeviceCard.scss';
import type { Messages } from '@/i18n/types';
import { useLanguage } from '@/i18n/LanguageProvider';

export type DeviceCardProps = {
  device: keyof Messages['deviceCard'];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export default function DeviceCard({ device, icon: Icon }: DeviceCardProps) {
  const { t } = useLanguage();

  return (
    <div className="device-card">
      <header className="device-card__header">
        <div className="device-card__image-wrapper">
          <Icon className="device-card__image" />
        </div>
        <h3 className="device-card__title h4">{t(`deviceCard.${device}.title`)}</h3>
      </header>
      <div className="device-card__description">
        <p className="device-card__description-text">{t(`deviceCard.${device}.descr`)}</p>
      </div>
    </div>
  );
}
