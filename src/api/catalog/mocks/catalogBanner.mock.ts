import type { CatalogSectionDto } from '@/api/catalog/catalog.types';

export const catalogBannerMock: CatalogSectionDto = {
  id: 'catalog-banner',
  title: {
    en: 'Catalog banner',
    ru: 'Баннер каталога',
  },
  category: 'poster',
  items: [
    {
      id: 'avengers-endgame',
      title: {
        en: 'Avengers: Endgame',
        ru: 'Мстители: Финал',
      },
      description: {
        en: `With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.`,
        ru: 'С помощью оставшихся союзников Мстители должны вновь собраться вместе, чтобы исправить последствия действий Таноса и восстановить порядок во вселенной — какой бы ценой это ни далось и с кем бы им ни пришлось столкнуться... Отомстите за павших.',
      },
      images: ['/images/catalog/catalogpage/banner/avengers-endgame.jpg'],
    },
    {
      id: 'riddick',
      title: {
        en: 'Riddick',
        ru: 'Риддик',
      },
      description: {
        en: `Left for dead on a desolate planet, Riddick must fight dangerous predators and ruthless mercenaries while struggling to survive in one of the harshest environments imaginable.`,
        ru: 'Оставленный умирать на пустынной планете, Риддик вынужден сражаться с опасными хищниками и безжалостными наёмниками, пытаясь выжить в одном из самых суровых мест во вселенной.',
      },
      images: ['/images/catalog/catalogpage/banner/riddick.jpg'],
    },
    {
      id: 'interstellar',
      title: {
        en: 'Interstellar',
        ru: 'Интерстеллар',
      },
      description: {
        en: `As Earth faces environmental collapse, a team of explorers travels through a mysterious wormhole in search of a new home for humanity, where time, space, and love intertwine in unexpected ways.`,
        ru: 'Когда Земля оказывается на грани экологической катастрофы, группа исследователей отправляется через загадочную червоточину в поисках нового дома для человечества, где время, пространство и любовь переплетаются самым неожиданным образом.',
      },
      images: ['/images/catalog/catalogpage/banner/interstellar.jpg'],
    },
    {
      id: 'edge-of-tomorrow',
      title: {
        en: 'Edge of Tomorrow',
        ru: 'Грань будущего',
      },
      description: {
        en: `Caught in a relentless time loop during a war against alien invaders, an inexperienced soldier must relive the same brutal battle over and over again to save humanity.`,
        ru: 'Оказавшись в бесконечной временной петле во время войны с инопланетными захватчиками, неопытный солдат вынужден снова и снова переживать одну и ту же смертельную битву, чтобы спасти человечество.',
      },
      images: ['/images/catalog/catalogpage/banner/edge.jpg'],
    },
  ],
};
