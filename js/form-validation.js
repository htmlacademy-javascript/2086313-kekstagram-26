import { checkStringLength } from './util.js';
import { sendData } from './api.js';
import { closeModal, resetUploadFile } from './modal.js';
import { resetScale } from './photo-resize.js';
import { resetFilter } from './photo-filters.js';
import { showMessage } from './show-message.js';

//модуль отвечает за валидацию и отправку формы загрузки нового изображения (поля хэштегов и описания)

//константы
//максимальное кол-во хэштегов и длина описания фотографии
const HASHTAG_MAX_AMOUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;

//Сообщения об ошибках при валидации формы
const ErrorMessages = {
  HASHTAG_FORMAT : 'Каждый хэштег должен начинаться с # и после содержать от 1 до 19 букв и/или цифр',
  HASHTAG_AMOUNT : `Допустимо не более ${HASHTAG_MAX_AMOUNT} хэштегов`,
  HASHTAG_REPEAT : 'Хэштеги не должны повторяться',
  DESCRIPTION_LENGTH : `Максимальная длина описания - ${DESCRIPTION_MAX_LENGTH} символов`
};

//Сообщение об успешной отправке формы
const successMessageTemplate  = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const successButton = successMessageElement.querySelector('.success__button');

//Сообщение об ошибке отправки формы
const errorMessageTemplate  = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');

//Валидируемая форма
const imgUploadFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

//создание pristin
const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, true);

//функции очистки полей ввода
const resetHashtagField = () => {
  hashtagFieldElement.value = '';
};
const resetDescriptionField = () => {
  descriptionFieldElement.value = '';
};

//функция очистки валидатора
const resetValidator = () => {
  pristine.reset();
};

//функция сброса формы
const resetForm = () => {
  resetUploadFile();
  resetHashtagField();
  resetDescriptionField();
  resetValidator();
  resetScale();
  resetFilter();
};

//функция берет строку из поля и преобразовавыет в массив, содержащий хэштеги
const getHashtagsfromField = () => {
  //переводим введенные хэштеги в нижний регистр
  const hashtagsInLowerCase = hashtagFieldElement.value.toLowerCase();
  //удаляем лишние случайные пробелы в строке с хэштегами и заносим хэштеги в массив
  const hashtags = hashtagsInLowerCase.replace(/^ +| +$|( )+/g,'$1').split(' ');
  return hashtags;
};

//проверка количества хэштегов
const isHashtagAmountValid = () => {
  const hashtags = getHashtagsfromField();
  return (hashtags.length <= HASHTAG_MAX_AMOUNT);
};

//регулярное выражение определяющее формат хэштегов
const hashtagRE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

//проверка хэштега на соответствие формату
const isHashtagValid =  (currentValue) =>
  hashtagRE.test(currentValue);

//проверка всех хэштега на соответствие формату
const isHashtagsValid = () => {
  if (hashtagFieldElement.value === '') {
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
  checkStringLength(descriptionFieldElement.value, DESCRIPTION_MAX_LENGTH);


//валидация на количество хэштегов, формат записи и дублирование. Валидация описания изображения на длину.
pristine.addValidator(hashtagFieldElement, isHashtagAmountValid, ErrorMessages.HASHTAG_AMOUNT);
pristine.addValidator(hashtagFieldElement, isHashtagsValid, ErrorMessages.HASHTAG_FORMAT);
pristine.addValidator(hashtagFieldElement, isHashtagUnique, ErrorMessages.HASHTAG_REPEAT);
pristine.addValidator(descriptionFieldElement, isDescriptionValid, ErrorMessages.DESCRIPTION_LENGTH);

//функции блокировки и разблокировки кнопки отправки
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const onSuccess = () => {
  closeModal();
  unblockSubmitButton();
  resetForm();
  showMessage(successMessageElement, successButton);
};

const onFail = () => {
  closeModal();
  showMessage(errorMessageElement,errorButtonElement);
  unblockSubmitButton();
  resetUploadFile();
};

//отправки формы и вывод сообщений с результатом
imgUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(onSuccess, onFail, new FormData(evt.target));
  }

});

export { resetForm };
