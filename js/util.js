//функция проверяет строку на соответствие максимальной длине ()
const checkStringLength = (string, maxLength) => string.length <= maxLength;

//функция генерирует случайные числа из диапазона
const getRandomPositiveInteger = (min, max) => {
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
const getUniqueRandomInteger = (min, max, usedIds) => {
  const uniqueRandomInteger = getRandomPositiveInteger(min, max);
  if (usedIds.includes(uniqueRandomInteger)){
    return getUniqueRandomInteger(min, max, usedIds);
  }

  usedIds.push(uniqueRandomInteger);
  return uniqueRandomInteger;

};

//функция генерирует случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length-1)];


//Алерт при ошибке ответа сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

const toggleFilterButton = (activButton, buttonClass, pressedButton) => {
  activButton.classList.remove(buttonClass);
  pressedButton.classList.add(buttonClass);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomArrayElement,
  getUniqueRandomInteger,
  showAlert,
  toggleFilterButton,
  debounce};

