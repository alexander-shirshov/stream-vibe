import type { MovieDto } from '@/api/movie/movie.types';

export const moviesMock: MovieDto[] = [
  {
    id: 'kantara',
    slug: 'kantara',

    title: {
      en: 'Kantara',
      ru: 'Kantara',
    },
    description: {
      en: 'A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.',
      ru: 'В одной из деревень Южной Индии вспыльчивый молодой человек вступает в противостояние с непреклонным лесным инспектором. Там, где судьба, духовные традиции и древние легенды правят жизнью людей, их конфликт становится частью гораздо более масштабной истории.',
    },
    preview: '/images/movies/previews/kantara.jpg',

    releaseDate: '2022-09-30',

    languages: [
      {
        en: 'English',
        ru: 'Английский',
      },
      {
        en: 'Hindi',
        ru: 'Хинди',
      },
      {
        en: 'Tamil',
        ru: 'Тамильский',
      },
      {
        en: 'Telugu',
        ru: 'Телугу',
      },
      {
        en: 'Kannada',
        ru: 'Каннада',
      },
    ],

    genres: [
      {
        en: 'Action',
        ru: 'Экшн',
      },
      {
        en: 'Adventure',
        ru: 'Приключения',
      },
    ],

    cast: [
      {
        id: 'rishab-shetty',
        firstName: 'Rishab',
        lastName: 'Shetty',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/1.jpg',
      },
      {
        id: 'kishore',
        firstName: 'Kishore',
        lastName: 'Kumar',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/2.jpg',
      },
      {
        id: 'achyuth-kumar',
        firstName: 'Achyuth',
        lastName: 'Kumar',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/3.jpg',
      },
      {
        id: 'sapthami-gowda',
        firstName: 'Sapthami',
        lastName: 'Gowda',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/4.jpg',
      },
      {
        id: 'manasi-sudhhir',
        firstName: 'Manasi',
        lastName: 'Sudhir',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/5.jpg',
      },
      {
        id: 'pramod-shetty',
        firstName: 'Pramod',
        lastName: 'Shetty',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/6.jpg',
      },
      {
        id: 'swaraj-shetty',
        firstName: 'Swaraj',
        lastName: 'Shetty',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/7.jpg',
      },
      {
        id: 'deepak-rai',
        firstName: 'Deepak',
        lastName: 'Rai',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/8.jpg',
      },
      {
        id: 'raghu-pandeshwar',
        firstName: 'Raghu',
        lastName: 'Pandeshwar',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/9.jpg',
      },
      {
        id: 'rakshit-ram',
        firstName: 'Rakshit',
        lastName: 'Ram',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        avatar: '/images/persons/cast/10.jpg',
      },
    ],

    director: {
      id: 'rishab-shetty',
      firstName: 'Rishab',
      lastName: 'Shetty',
      country: {
        en: 'India',
        ru: 'Индия',
      },
      avatar: '/images/persons/director/director.jpg',
    },

    music: {
      id: 'b-ajaneesh-loknath',
      firstName: 'B.',
      lastName: 'Ajaneesh Loknath',
      country: {
        en: 'India',
        ru: 'Индия',
      },
      avatar: '/images/persons/music/music.jpg',
    },

    ratings: [
      {
        platform: 'IMDb',
        rating: 4.5,
        ratingCount: 4500,
      },
      {
        platform: 'StreamVibe',
        rating: 4,
        ratingCount: 4000,
      },
    ],

    reviews: [
      {
        id: 'review-1',
        authorName: 'Aniket Roy',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 4.5,
        text: {
          en: 'This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so could not watch it.',
          ru: 'Этот фильм мне порекомендовал близкий друг. Я хотел посмотреть его в кинотеатре, но билетов уже не было.',
        },
      },

      {
        id: 'review-2',
        authorName: 'Swaraj',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 5,
        text: {
          en: 'A restless king promises his lands to the local tribals in exchange for a stone deity wherein he finds solace and peace of mind.',
          ru: 'История о древнем обещании и духовной связи людей с их землёй оставляет сильное впечатление.',
        },
      },

      {
        id: 'review-3',
        authorName: 'Rahul Sharma',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 4,
        text: {
          en: 'Excellent cinematography and outstanding performances from the cast.',
          ru: 'Потрясающая операторская работа и великолепная актёрская игра.',
        },
      },

      {
        id: 'review-4',
        authorName: 'Priya Nair',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 4.5,
        text: {
          en: 'The folklore elements blend perfectly with the action scenes.',
          ru: 'Фольклорные мотивы идеально сочетаются с экшеном.',
        },
      },

      {
        id: 'review-5',
        authorName: 'Vikram Rao',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 5,
        text: {
          en: 'One of the most immersive Indian films I have seen in years.',
          ru: 'Один из самых захватывающих индийских фильмов последних лет.',
        },
      },

      {
        id: 'review-6',
        authorName: 'Aisha Khan',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 4,
        text: {
          en: 'Great soundtrack and a memorable climax.',
          ru: 'Отличный саундтрек и очень сильная концовка.',
        },
      },

      {
        id: 'review-7',
        authorName: 'Arjun Patel',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 4.5,
        text: {
          en: 'The atmosphere and visuals are absolutely stunning.',
          ru: 'Атмосфера и визуальный стиль просто потрясающие.',
        },
      },

      {
        id: 'review-8',
        authorName: 'Neha Verma',
        country: {
          en: 'India',
          ru: 'Индия',
        },
        rating: 5,
        text: {
          en: 'A unique mix of mythology, drama and action.',
          ru: 'Уникальное сочетание мифологии, драмы и экшена.',
        },
      },
    ],
  },
];
