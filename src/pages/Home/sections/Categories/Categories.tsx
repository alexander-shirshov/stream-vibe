import Section from '@/layouts/Section';
import './Categories.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
import { categoryItems } from '@/config/categoryItems';
import CategoryCard from '@/components/CategoryCard';

export function Categories() {
  const { t } = useLanguage();

  return (
    <Section
      title={t('categories.title')}
      titleId="categories-title"
      description={t('categories.descr')}
      isActionsHiddenOnMobile
      actions={
        <div>
          <button>Назад</button>
          <button>Вперед</button>
        </div>
      }
    >
      {categoryItems.map(cat => {
        return <CategoryCard key={cat.genre} {...cat}></CategoryCard>;
      })}
    </Section>
  );
}
