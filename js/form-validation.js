import {checkStringLength} from './util.js';
import {sendData} from './api.js';
import {closeModal, resetUploadFile, isEscapeKey} from './modal.js';
import {resetScale} from './photo-resize.js';
import {resetFilter} from './photo-filters.js';

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
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

//Сообщение об ошибке отправки формы
const errorMessageTemplate  = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');


//функция добавления сообщения о результате отправки и удаление по esc и кнопке
const showMessage = (message, button) => {

  const hideMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onMessagePressEsc);
    document.removeEventListener('click', isClickOuside);
  };

  document.body.append(message);
  button.addEventListener('click', () => hideMessage());
  document.addEventListener('keydown', onMessagePressEsc);
  document.addEventListener('click', isClickOuside);

  function isClickOuside  (evt) {
    const clickInside = message.children[0].contains(evt.target);
    if (!clickInside) {
      hideMessage();
    }
  }

  function onMessagePressEsc () {
    if (isEscapeKey) {
      hideMessage();
    }
  }

};


//Валидируемая форма
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

//создание pristin
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, true);

//функции очистки полей ввода
const resetHashtagField = () => {
  hashtagField.value = '';
};
const resetDescriptionField = () => {
  descriptionField.value = '';
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

//регулярное выражение определяющее формат хэштегов
const hashtagRE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

//проверка хэштега на соответствие формату
const isHashtagValid =  (currentValue) =>
  hashtagRE.test(currentValue);

//проверка всех хэштега на соответствие формату
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
pristine.addValidator(hashtagField, isHashtagAmountValid, ErrorMessages.HASHTAG_AMOUNT);
pristine.addValidator(hashtagField, isHashtagsValid, ErrorMessages.HASHTAG_FORMAT);
pristine.addValidator(hashtagField, isHashtagUnique, ErrorMessages.HASHTAG_REPEAT);
pristine.addValidator(descriptionField, isDescriptionValid, ErrorMessages.DESCRIPTION_LENGTH);

//функции блокировки и разблокировки кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//отправки формы и вывод сообщений с результатом
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        closeModal();
        unblockSubmitButton();
        resetForm();
        showMessage(successMessage, successButton);
      },

      () => {
        closeModal();
        showMessage(errorMessage,errorButton);
        unblockSubmitButton();
        resetUploadFile();
      },

      new FormData(evt.target));
  }

});

export {resetForm};
