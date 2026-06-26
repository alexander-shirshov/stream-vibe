import { useState } from 'react';

import './Seasons.scss';
import AccordionGroup from '@/components/AccordionGroup';
import type { Season } from '@/api/show/show.types';
import Accordion from '@/components/Accordion';
import EpisodeCard from '@/components/EpisodeCard';
import EpisodePlayerModal from '@/components/EpisodePlayerModal';

import { useLanguage } from '@/i18n/LanguageProvider';
import { formatEpisodesCountRu } from '@/utils/pluralize';

type PlayerState = {
  seasonId: string;
  episodeId: string;
} | null;

type SeasonsProps = {
  seasons: Season[];
};

export default function Seasons({ seasons }: SeasonsProps) {
  const [playerState, setPlayerState] = useState<PlayerState>(null);

  const { language } = useLanguage();
  const episodesCount = (number: number) =>
    language === 'ru' ? formatEpisodesCountRu(number) : `${number} Episodes`;

  return (
    <>
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
                    <EpisodeCard
                      {...episode}
                      number={index + 1}
                      onPlay={() =>
                        setPlayerState({
                          seasonId: season.id,
                          episodeId: episode.id,
                        })
                      }
                    />
                  </li>
                ))}
              </ul>
            </Accordion>
          );
        })}
      </AccordionGroup>

      {playerState && (
        <EpisodePlayerModal
          isOpen={Boolean(playerState)}
          seasons={seasons}
          seasonId={playerState.seasonId}
          episodeId={playerState.episodeId}
          onEpisodeChange={(seasonId, episodeId) => {
            setPlayerState({ seasonId, episodeId });
          }}
          onClose={() => setPlayerState(null)}
        />
      )}
    </>
  );
}
