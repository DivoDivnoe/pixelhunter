import * as constants from '../constants';

export const initialState = {
  name: null,
  result: null,
  time: constants.TIME_PER_SCREEN,
  lives: constants.NUM_OF_LIVES,
  answers: [],
  questionNumber: 0,
  questions: [
    {
      type: `game1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      items: [
        {
          img: `https://k42.kn3.net/CF42609C8.jpg`,
          answer: `paint`
        },
        {
          img: `https://k42.kn3.net/D2F0370D6.jpg`,
          answer: `paint`
        }
      ]
    },
    {
      type: `game2`,
      title: `Угадай, фото или рисунок?`,
      img: `https://k42.kn3.net/CF42609C8.jpg`,
      answer: `paint`
    },
    {
      type: `game3`,
      title: `Найдите фотографию среди изображений`,
      items: [
        {
          img: `https://k42.kn3.net/CF42609C8.jpg`,
          answer: false
        },
        {
          img: `https://k42.kn3.net/D2F0370D6.jpg`,
          answer: false
        },
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: true
        }
      ]
    },
    {
      type: `game1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      items: [
        {
          img: `https://k32.kn3.net/5C7060EC5.jpg`,
          answer: `paint`
        },
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: `photo`
        }
      ]
    },
    {
      type: `game2`,
      title: `Угадай, фото или рисунок?`,
      img: `http://i.imgur.com/1KegWPz.jpg`,
      answer: `photo`
    },
    {
      type: `game3`,
      title: `Найдите рисунок среди изображений`,
      items: [
        {
          img: `http://i.imgur.com/DKR1HtB.jpg`,
          answer: false
        },
        {
          img: `https://k32.kn3.net/5C7060EC5.jpg`,
          answer: true
        },
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: false
        }
      ]
    },
    {
      type: `game1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      items: [
        {
          img: `https://i.imgur.com/DiHM5Zb.jpg`,
          answer: `photo`
        },
        {
          img: `http://i.imgur.com/DKR1HtB.jpg`,
          answer: `photo`
        }
      ]
    },
    {
      type: `game2`,
      title: `Угадай, фото или рисунок?`,
      img: `http://i.imgur.com/DKR1HtB.jpg`,
      answer: `photo`
    },
    {
      type: `game3`,
      title: `Найдите фотографию среди изображений`,
      items: [
        {
          img: `https://k42.kn3.net/CF42609C8.jpg`,
          answer: false
        },
        {
          img: `https://k42.kn3.net/D2F0370D6.jpg`,
          answer: false
        },
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: true
        }
      ]
    },
    {
      type: `game1`,
      title: `Угадайте для каждого изображения фото или рисунок?`,
      items: [
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: `paint`
        },
        {
          img: `http://i.imgur.com/1KegWPz.jpg`,
          answer: `photo`
        }
      ]
    }
  ]
};

export const urls = [
  `https://k42.kn3.net/CF42609C8.jpg`,
  `https://k42.kn3.net/D2F0370D6.jpg`,
  `https://k32.kn3.net/5C7060EC5.jpg`,
  `http://i.imgur.com/1KegWPz.jpg`,
  `https://i.imgur.com/DiHM5Zb.jpg`,
  `http://i.imgur.com/DKR1HtB.jpg`
];

export const results = [
  {
    result: `win`,
    points: 1000,
    speedBonus: 50,
    livesBonus: 100,
    slowPenalty: -100,
    total: 1050
  },
  {
    result: `win`,
    points: 1000,
    speedBonus: 50,
    livesBonus: 100,
    slowPenalty: -100,
    total: 1050
  }
];

