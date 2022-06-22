//функция проверяет строку на соответствие максимальной длине ()
const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

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

//Функция генерирует уникальное случайное число
const getUniqueRandomInteger = function (min, max, usedIds) {
  const uniqueRandomInteger = getRandomPositiveInteger(min, max);

  if (usedIds.includes(uniqueRandomInteger)){
    return getUniqueRandomInteger(min, max, usedIds);
  }

  usedIds.push(uniqueRandomInteger);
  return uniqueRandomInteger;

};

//функция генерирует случайный элемент массива
const getRandomArrayElement = function (array) {
  return array[getRandomPositiveInteger(0, array.length-1)];
};


export {checkStringLength, getRandomPositiveInteger, getRandomArrayElement, getUniqueRandomInteger};
