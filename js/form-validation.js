import {checkStringLength} from './util.js';

//модуль отвечает за валидацию формы загрузки нового изображения (поля хэштегов и описания)

//константы
const HASHTAG_MAX_AMOUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const errorMessage = {
  HASHTAG_FORMAT : 'Каждый хэштег должен начинаться с # и после содержать от 1 до 19 букв и/или цифр',
  HASHTAG_AMOUNT : `Допустимо не более ${HASHTAG_MAX_AMOUNT} хэштегов`,
  HASHTAG_REPEAT : 'Хэштеги не должны повторяться',
  DESCRIPTION_LENGTH : `Максимальная длина описания - ${DESCRIPTION_MAX_LENGTH} символов`
};

//Валидируемая форма
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, true);

//функция берет строку из поля и преобразовавыет в массив, содержащий хэштеги
const getHashtagsfromField = () => {
  //переводим введенные хэштеги в нижний регистр
  const hashtagsInLowerCase = hashtagField.value.toLowerCase();
  //удаляем лишние случайные пробелы в строке с хэштегами и заносим хэштеги в массив
  const hashtags = hashtagsInLowerCase.replace(/^ +| +$|( )+/g,'$1').split(' ');
  return hashtags;
};

//проверка количества хэштегов
const isHashtagAmountValid = () => {
  const hashtags = getHashtagsfromField();
  return (hashtags.length <= HASHTAG_MAX_AMOUNT);
};

// регульярное выражение определяющее формат хэштегов
const hashtagRE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// проверка хэштега на соответствие формату
const isHashtagValid =  (currentValue) =>
  hashtagRE.test(currentValue);

// проверка всех хэштега на соответствие формату
const isHashtagsValid = () => {
  if (hashtagField.value === '') {
    return true;
  }
  const hashtags = getHashtagsfromField();
  return hashtags.every(isHashtagValid);
};

//проверка хэштегов на уникальность
const isHashtagUnique = () => {
  const hashtags = getHashtagsfromField();
  const set = new Set(hashtags);
  return (set.size === hashtags.length);
};

//проверка длины описания изображения
const isDescriptionValid = () =>
  checkStringLength(descriptionField.value, DESCRIPTION_MAX_LENGTH);


//валидация на количество хэштегов, формат записи и дублирование. Валидация описания изображения на длину.
pristine.addValidator(hashtagField, isHashtagAmountValid, errorMessage.HASHTAG_AMOUNT);
pristine.addValidator(hashtagField, isHashtagsValid, errorMessage.HASHTAG_FORMAT);
pristine.addValidator(hashtagField, isHashtagUnique, errorMessage.HASHTAG_REPEAT);
pristine.addValidator(descriptionField, isDescriptionValid, errorMessage.DESCRIPTION_LENGTH);


//валидация формы и вывод в консоль результата при отправке формы
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }

});
