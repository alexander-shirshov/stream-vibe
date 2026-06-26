import AccordionGroup from '@/components/AccordionGroup';
import './Seasons.scss';
import type { Season } from '@/api/show/show.types';
import Accordion from '@/components/Accordion';
import EpisodeCard from '@/components/EpisodeCard';

import { useLanguage } from '@/i18n/LanguageProvider';
import { formatEpisodesCountRu } from '@/utils/pluralize';

type SeasonsProps = {
  seasons: Season[];
};

export default function Seasons({ seasons }: SeasonsProps) {
  const { t, language } = useLanguage();
  const episodesCount = (number: number) =>
    language === 'ru' ? formatEpisodesCountRu(number) : `${number} Episodes`;

  return (
    <AccordionGroup className="seasons" isOrderedList={false} variant="dark" columns={1}>
      {seasons.map((season, index) => {
        return (
          <Accordion
            key={season.id}
            title={season.title}
            titleClassName="h4"
            subtitle={episodesCount(season.episodes.length)}
            id={season.id}
            name={'seasons'}
            isOpen={seasons.length >= 2 ? index === 1 : index === 0}
            hasArrowButton
          >
            <ul className="seasons__list">
              {season.episodes.map((episode, index) => (
                <li className="seasons__item" key={episode.id}>
                  <EpisodeCard {...episode} number={index + 1} />
                </li>
              ))}
            </ul>
          </Accordion>
        );
      })}
    </AccordionGroup>
  );
}
