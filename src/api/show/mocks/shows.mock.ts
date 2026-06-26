import type { ShowDto } from '@/api/show/show.types';

export const showsMock: ShowDto[] = [
  {
    id: 'stranger-things',
    slug: 'stranger-things',
    title: {
      en: 'Stranger Things',
      ru: 'Очень странные дела',
    },
    description: {
      en: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      ru: 'После исчезновения мальчика маленький город сталкивается с тайной, связанной с секретными экспериментами, пугающими сверхъестественными силами и странной девочкой.',
    },
    preview: '/images/shows/stranger-things/preview.jpg',
    releaseDate: '2016-07-15',

    languages: [
      { en: 'English', ru: 'Английский' },
      { en: 'Spanish', ru: 'Испанский' },
      { en: 'French', ru: 'Французский' },
      { en: 'German', ru: 'Немецкий' },
    ],

    genres: [
      { en: 'Sci-Fi', ru: 'Фантастика' },
      { en: 'Mystery', ru: 'Мистика' },
      { en: 'Horror', ru: 'Ужасы' },
      { en: 'Drama', ru: 'Драма' },
    ],

    seasons: [
      {
        id: 'stranger-things-s1',
        seasonNumber: 1,
        title: { en: 'Season 01', ru: 'Сезон 01' },
        episodes: [
          {
            id: 'stranger-things-s1-e1',
            title: {
              en: 'Chapter One: The Vanishing of Will Byers',
              ru: 'Глава первая: Исчезновение Уилла Байерса',
            },
            description: {
              en: 'A quiet night in Hawkins turns into a nightmare when Will Byers disappears on his way home.',
              ru: 'Тихий вечер в Хоукинсе превращается в кошмар, когда Уилл Байерс исчезает по дороге домой.',
            },
            durationMinutes: 49,
            preview: '/images/shows/stranger-things/s1/e1.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s1-e2',
            title: {
              en: 'Chapter Two: The Weirdo on Maple Street',
              ru: 'Глава вторая: Странная девочка с Мейпл-стрит',
            },
            description: {
              en: 'Mike hides a mysterious girl while the search for Will grows more desperate.',
              ru: 'Майк прячет загадочную девочку, пока поиски Уилла становятся всё отчаяннее.',
            },
            durationMinutes: 56,
            preview: '/images/shows/stranger-things/s1/e2.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s1-e3',
            title: { en: 'Chapter Three: Holly, Jolly', ru: 'Глава третья: Весёлого Рождества' },
            description: {
              en: 'Joyce believes Will is trying to communicate, while Eleven reveals more of her power.',
              ru: 'Джойс верит, что Уилл пытается выйти на связь, а Одиннадцать показывает новые способности.',
            },
            durationMinutes: 52,
            preview: '/images/shows/stranger-things/s1/e3.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s1-e4',
            title: { en: 'Chapter Four: The Body', ru: 'Глава четвёртая: Тело' },
            description: {
              en: 'A grim discovery shakes the town, but Joyce refuses to accept what everyone else believes.',
              ru: 'Мрачная находка потрясает город, но Джойс отказывается верить очевидному.',
            },
            durationMinutes: 51,
            preview: '/images/shows/stranger-things/s1/e4.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s1-e5',
            title: {
              en: 'Chapter Five: The Flea and the Acrobat',
              ru: 'Глава пятая: Блоха и акробат',
            },
            description: {
              en: 'The kids begin to understand the Upside Down, and Hopper digs deeper into the lab.',
              ru: 'Ребята начинают понимать природу Изнанки, а Хоппер всё глубже копает под лабораторию.',
            },
            durationMinutes: 53,
            preview: '/images/shows/stranger-things/s1/e5.jpg',
            video: '/videos/example.mp4',
          },
        ],
      },
      {
        id: 'stranger-things-s2',
        seasonNumber: 2,
        title: { en: 'Season 02', ru: 'Сезон 02' },
        episodes: [
          {
            id: 'stranger-things-s2-e1',
            title: { en: 'Chapter One: MADMAX', ru: 'Глава первая: МЭДМАКС' },
            description: {
              en: 'A new girl arrives in Hawkins, and Will struggles with visions from another world.',
              ru: 'В Хоукинсе появляется новая девочка, а Уилла преследуют видения из другого мира.',
            },
            durationMinutes: 48,
            preview: '/images/shows/stranger-things/s2/e1.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s2-e2',
            title: {
              en: 'Chapter Two: Trick or Treat, Freak',
              ru: 'Глава вторая: Кошелёк или жизнь, чудик',
            },
            description: {
              en: 'Halloween brings costumes, secrets and another terrifying sign that the danger is not gone.',
              ru: 'Хэллоуин приносит костюмы, тайны и новый жуткий знак, что опасность не исчезла.',
            },
            durationMinutes: 56,
            preview: '/images/shows/stranger-things/s2/e2.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s2-e3',
            title: { en: 'Chapter Three: The Pollywog', ru: 'Глава третья: Головастик' },
            description: {
              en: 'Dustin finds something strange in the trash, while Will’s connection to the Upside Down deepens.',
              ru: 'Дастин находит странное существо, а связь Уилла с Изнанкой становится сильнее.',
            },
            durationMinutes: 51,
            preview: '/images/shows/stranger-things/s2/e3.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s2-e4',
            title: { en: 'Chapter Four: Will the Wise', ru: 'Глава четвёртая: Уилл Мудрый' },
            description: {
              en: 'Will gives the group a disturbing clue, and Hopper discovers something buried beneath Hawkins.',
              ru: 'Уилл даёт тревожную подсказку, а Хоппер находит нечто скрытое под Хоукинсом.',
            },
            durationMinutes: 46,
            preview: '/images/shows/stranger-things/s2/e4.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s2-e5',
            title: { en: 'Chapter Five: Dig Dug', ru: 'Глава пятая: Диг Даг' },
            description: {
              en: 'Nancy and Jonathan chase the truth, while Hopper fights to survive underground.',
              ru: 'Нэнси и Джонатан ищут правду, а Хоппер пытается выжить под землёй.',
            },
            durationMinutes: 58,
            preview: '/images/shows/stranger-things/s2/e5.jpg',
            video: '/videos/example.mp4',
          },
        ],
      },
      {
        id: 'stranger-things-s3',
        seasonNumber: 3,
        title: { en: 'Season 03', ru: 'Сезон 03' },
        episodes: [
          {
            id: 'stranger-things-s3-e1',
            title: { en: 'Chapter One: Suzie, Do You Copy?', ru: 'Глава первая: Сьюзи, приём' },
            description: {
              en: 'Summer begins in Hawkins, but a strange signal hints that something has returned.',
              ru: 'В Хоукинсе начинается лето, но странный сигнал намекает: что-то вернулось.',
            },
            durationMinutes: 50,
            preview: '/images/shows/stranger-things/s3/e1.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s3-e2',
            title: { en: 'Chapter Two: The Mall Rats', ru: 'Глава вторая: Торговые крысы' },
            description: {
              en: 'The new mall becomes the center of attention, while Billy’s behavior grows more disturbing.',
              ru: 'Новый торговый центр притягивает всех, а поведение Билли становится всё тревожнее.',
            },
            durationMinutes: 49,
            preview: '/images/shows/stranger-things/s3/e2.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s3-e3',
            title: {
              en: 'Chapter Three: The Case of the Missing Lifeguard',
              ru: 'Глава третья: Дело пропавшей спасательницы',
            },
            description: {
              en: 'Nancy follows a lead, Eleven and Max investigate Billy, and the danger begins to spread.',
              ru: 'Нэнси идёт по следу, Одиннадцать и Макс следят за Билли, а опасность распространяется.',
            },
            durationMinutes: 49,
            preview: '/images/shows/stranger-things/s3/e3.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s3-e4',
            title: { en: 'Chapter Four: The Sauna Test', ru: 'Глава четвёртая: Тест в сауне' },
            description: {
              en: 'The group sets a trap to learn what is controlling Billy.',
              ru: 'Ребята устраивают ловушку, чтобы понять, что управляет Билли.',
            },
            durationMinutes: 52,
            preview: '/images/shows/stranger-things/s3/e4.jpg',
            video: '/videos/example.mp4',
          },
          {
            id: 'stranger-things-s3-e5',
            title: { en: 'Chapter Five: The Flayed', ru: 'Глава пятая: Одержимые' },
            description: {
              en: 'Hopper and Joyce search for answers, while the kids realize the enemy has many faces.',
              ru: 'Хоппер и Джойс ищут ответы, а ребята понимают, что у врага много лиц.',
            },
            durationMinutes: 51,
            preview: '/images/shows/stranger-things/s3/e5.jpg',
            video: '/videos/example.mp4',
          },
        ],
      },
    ],

    cast: [
      {
        id: 'winona-ryder',
        firstName: 'Winona',
        lastName: 'Ryder',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/winona-ryder.jpg',
      },
      {
        id: 'david-harbour',
        firstName: 'David',
        lastName: 'Harbour',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/david-harbour.jpg',
      },
      {
        id: 'natalia-dyer',
        firstName: 'Natalia',
        lastName: 'Dyer',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/natalia-dyer.jpg',
      },
      {
        id: 'finn-wolfhard',
        firstName: 'Finn',
        lastName: 'Wolfhard',
        country: {
          en: 'Canada',
          ru: 'Канада',
        },
        avatar: '/images/persons/cast/finn-wolfhard.jpg',
      },
      {
        id: 'gaten-matarazzo',
        firstName: 'Gaten',
        lastName: 'Matarazzo',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/gaten-matarazzo.jpg',
      },
      {
        id: 'caleb-mclaughlin',
        firstName: 'Caleb',
        lastName: 'McLaughlin',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/caleb-mclaughlin.jpg',
      },
      {
        id: 'noah-schnapp',
        firstName: 'Noah',
        lastName: 'Schnapp',
        country: {
          en: 'Canada',
          ru: 'Канада',
        },
        avatar: '/images/persons/cast/noah-schnapp.jpg',
      },
      {
        id: 'sadie-sink',
        firstName: 'Sadie',
        lastName: 'Sink',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/sadie-sink.jpg',
      },
      {
        id: 'joe-keery',
        firstName: 'Joe',
        lastName: 'Keery',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/joe-keery.jpg',
      },
      {
        id: 'maya-hawke',
        firstName: 'Maya',
        lastName: 'Hawke',
        country: {
          en: 'USA',
          ru: 'США',
        },
        avatar: '/images/persons/cast/maya-hawke.jpg',
      },
    ],
    director: {
      id: 'duffer-brothers',
      firstName: 'The Duffer',
      lastName: 'Brothers',
      country: { en: 'USA', ru: 'США' },
      avatar: '/images/persons/director/duffer-brothers.jpg',
    },
    music: {
      id: 'kyle-dixon',
      firstName: 'Kyle',
      lastName: 'Dixon',
      country: { en: 'USA', ru: 'США' },
      avatar: '/images/persons/music/kyle-dixon.jpg',
    },

    ratings: [
      {
        platform: 'IMDb',
        rating: 8.6,
        ratingCount: 1500000,
      },
      {
        platform: 'Rotten Tomatoes',
        rating: 8.8,
        ratingCount: 500,
      },
    ],

    reviews: [
      {
        id: 'stranger-things-review-1',
        authorName: 'Emily Carter',
        country: { en: 'USA', ru: 'США' },
        rating: 4.5,
        text: {
          en: 'A nostalgic sci-fi mystery with a perfect mix of friendship, horror and heart.',
          ru: 'Ностальгическая фантастическая история с отличным сочетанием дружбы, ужаса и душевности.',
        },
      },
      {
        id: 'stranger-things-review-2',
        authorName: 'Daniel Moore',
        country: { en: 'UK', ru: 'Великобритания' },
        rating: 4,
        text: {
          en: 'The atmosphere is incredible, and the characters make even the weirdest moments feel emotional.',
          ru: 'Атмосфера невероятная, а персонажи делают даже самые странные моменты эмоциональными.',
        },
      },
      {
        id: 'stranger-things-review-3',
        authorName: 'Sophie Martin',
        country: { en: 'France', ru: 'Франция' },
        rating: 5,
        text: {
          en: 'One of the best modern TV shows. Every season feels bigger without losing its charm.',
          ru: 'Один из лучших современных сериалов. Каждый сезон становится масштабнее, не теряя своего очарования.',
        },
      },
      {
        id: 'stranger-things-review-4',
        authorName: 'Lucas Weber',
        country: { en: 'Germany', ru: 'Германия' },
        rating: 4.5,
        text: {
          en: 'The soundtrack alone deserves praise, but the cast and storytelling are just as memorable.',
          ru: 'Один только саундтрек заслуживает похвалы, но актерский состав и история не менее запоминающиеся.',
        },
      },
      {
        id: 'stranger-things-review-5',
        authorName: 'Olivia Brown',
        country: { en: 'Canada', ru: 'Канада' },
        rating: 4,
        text: {
          en: 'A great blend of adventure, mystery and horror. The young cast carries the show brilliantly.',
          ru: 'Отличное сочетание приключений, мистики и хоррора. Молодой актерский состав справляется великолепно.',
        },
      },
      {
        id: 'stranger-things-review-6',
        authorName: 'Mateo Rossi',
        country: { en: 'Italy', ru: 'Италия' },
        rating: 3.5,
        text: {
          en: 'Some episodes are slower than others, but the emotional moments always pay off.',
          ru: 'Некоторые эпизоды развиваются медленнее, но эмоциональные моменты всегда окупают ожидание.',
        },
      },
      {
        id: 'stranger-things-review-7',
        authorName: 'Ava Thompson',
        country: { en: 'Australia', ru: 'Австралия' },
        rating: 5,
        text: {
          en: 'An unforgettable mix of 80s nostalgia and supernatural suspense. I could not stop watching.',
          ru: 'Незабываемое сочетание атмосферы 80-х и сверхъестественной интриги. Невозможно оторваться от просмотра.',
        },
      },
      {
        id: 'stranger-things-review-8',
        authorName: 'Ethan Walker',
        country: { en: 'New Zealand', ru: 'Новая Зеландия' },
        rating: 4.5,
        text: {
          en: 'The world-building keeps expanding while the core friendships remain the heart of the story.',
          ru: 'Мир сериала постоянно расширяется, но дружба героев по-прежнему остается сердцем всей истории.',
        },
      },
    ],
  },
];
