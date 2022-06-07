function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw Error('Недопустимый диапазон! Введите числа от нуля и больше!');
  }
  if (max < min) {
    const memory = max;
    max = min;
    min = memory;
  }
  if (min === max) {
    throw Error('Недопустимый диапазон! Необходимо расширить диапазон')
 }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

getRandomInt(0,5);



function checkStringLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
    return false;
}

checkStringLength('Не было Галiлея i Боба Марлея, не было Сальвадора Далi', 60);
