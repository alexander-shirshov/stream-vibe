import Section from '@/layouts/Section';
import './Categories.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
import { categoryItems } from '@/config/categoryItems';
import CategoryCard from '@/components/CategoryCard';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';

export function Categories() {
  const { t } = useLanguage();

  const sliderNavId = 'categories-slider-navigation';

  return (
    <Section
      title={t('categories.title')}
      titleId="categories-title"
      description={t('categories.descr')}
      isActionsHiddenOnMobile
      actions={<SliderNavigation id={sliderNavId} />}
    >
      <Slider navTargetElementId={sliderNavId}>
        {categoryItems.map(cat => {
          return <CategoryCard key={cat.genre} {...cat}></CategoryCard>;
        })}
      </Slider>
    </Section>
  );
}
