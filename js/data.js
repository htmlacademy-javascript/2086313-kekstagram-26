import {getRandomPositiveInteger, getRandomArrayElement, getUniqueRandomInteger} from './util.js';

//исходные данные
const NUMBER_OF_PHOTOS = 25;

const DESCRIPTIONS = [
  'Кекс приехал на море',
  'Кекс ловит рыбку',
  'Кекс чистит рыбу',
  'Кекс жарит рыбу',
  'Кекс ест рыбку',
  'Кекс загорает',
  'Кекс гоняет мышей',
  'Кекс устал',
  'Кекс отдыхает',
  'Кекс не ловит мышей',
  'Кекс и Васька',
  'Кекс спит',
  'Кекс лежит',
  'Кекс свернулся в клубок',
  'Кекс пьет молоко',
  'Кекс охотится на голубей',
  'Кекс ничего не делает',
  'Кекс точит когти',
  'Кекс играет',
  'Кекс поет',
  'Кекс умывается',
  'Кекс опять спит',
  'Кекс снова спит',
  'Кекс поспал, теперь ест',
  'Кекс поел и спит'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Васька',
  'Мурзик',
  'Кот',
  'Барсик',
  'Геннадий'
];


//Массив, в который записываются ID всех комментариев
const allCommentsIds = [];

//функциия генерирует содержание одного комментария
const getComment = function () {
  const commentsDescription = {
    id: getUniqueRandomInteger(1, 10000, allCommentsIds),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
  return commentsDescription;
};

//функция генерует один пост
const getPost = function (index) {
  const descriptionPhoto = {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    descriotion: DESCRIPTIONS[index],
    likes: getRandomPositiveInteger(0, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 4)}, getComment)    //генерируется массив комментариев
  };
  return descriptionPhoto;
};

//Генерация итогового массива постов
const genPosts = function () {

  return Array.from({length: NUMBER_OF_PHOTOS}, (_, i) => getPost(i));    //списал у сокурсников, не до конца понимаю, как работает счетчик

};


export {genPosts};
