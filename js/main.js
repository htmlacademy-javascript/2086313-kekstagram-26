//функция проверяет строку на соответствие максимальной длине
const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('test', 10); //вызов функции, чтобы не ругались проверки на то, что она не используется

//функция генерирует случайные числа из диапазона
const getRandomPositiveInteger = function (min, max) {
  if (min < 0 || max < 0) {
    throw Error('Недопустимый диапазон! Введите числа от нуля и больше!');
  }
  if (max < min) {
    const memory = max;
    max = min;
    min = memory;
  }
  if (min === max) {
    throw Error('Недопустимый диапазон! Необходимо расширить диапазон');
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/*
const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
*/

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

//функция генерирует случайный элемент массива
const getRandomArrayElement = function (array) {
  return array[getRandomPositiveInteger(0, array.length-1)];
};

//Функция генерирует уникальное случайное число
const getUniqueRandomInteger = function (min, max, usedIds) {
  const uniqueRandomInteger = getRandomPositiveInteger(min, max);

  if (usedIds.includes(uniqueRandomInteger)){
    return getUniqueRandomInteger(min, max, usedIds);
  }

  usedIds.push(uniqueRandomInteger);
  return uniqueRandomInteger;

};

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

// eslint-disable-next-line no-unused-vars
const posts = genPosts();
//console.log(posts);
//console.log(allCommentsIds);

/*
Альтернативный код для генерации массивов циклами

//функция, генерирующая массив комментариев к отдельному фото.
const genComments = function (){
  let commentsDescriptions = [];

  for (let i = 0; i < getRandomPositiveInteger(0, 4); i++) {

    commentsDescriptions[i] = {
      id: getRandomPositiveInteger(1, 1000),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES)
      }

  }
  return commentsDescriptions;
}

//функция,генерирующая итоговый массив фото с описаниями.
let genDescriptionPhoto = function () {

  const descriptionPhotos = [];

  for (i = 0; i < NUMBER_OF_PHOTOS; i++) {

    const description = DESCRIPTIONS[i];

    let commentsList = genComments();

    descriptionPhotos[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      descriotion: description,
      likes: getRandomPositiveInteger(0, 200),
      comments: commentsList
    }

  }

  return descriptionPhotos;
}
*/
