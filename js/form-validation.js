import {checkStringLength} from './util.js';

//работа с формой. вынести в модули
const bodyDocument = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

//отмена закрытия формы по эскейпу при фокусе в поле ввода
hashtagField.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});
descriptionField.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});


//открытие формы редактирования изображения после загрузки файла
uploadFile.addEventListener('change', function () {
  uploadFileOverlay.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');
});

//закрытие формы редактирования изображения
buttonClose.addEventListener('click', function (){
  uploadFileOverlay.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  uploadForm.reset();
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    uploadFileOverlay.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
    uploadForm.reset();
  }
});

//Валидация хэштегов и описания
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, false);


//валидация формы и вывод в консоль результата при отправке формы
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //переводим введенные хэштеги в нижний регистр
  const hashtagsInLowerCase = hashtagField.value.toLowerCase();

  //удаляем лишние случайные пробелы в строке с хэштегами и заносим хэштеги в массив
  const hashtags = hashtagsInLowerCase.replace(/^ +| +$|( )+/g,'$1').split(' ');

  //проверка количества хэштегов
  const isHashtagAmmountValid = function () {
    return (hashtags.length <= 5);
  };

  //валидация на количество хэштегов
  pristine.addValidator(hashtagField, isHashtagAmmountValid, 'не более 5 хэштегов');

  // регульярное выражение определяющее формат хэштегов
  const hashtagRE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  // проверка хэштега на соответствие формату
  const isHashtagValid = function (currentValue) {
    return hashtagRE.test(currentValue);
  };

  // проверка всех хэштега на соответствие формату
  const isHashtagsValid = function () {
    if (hashtagField.value === '') {
      return true;
    }
    return hashtags.every(isHashtagValid);
  };

  //валидация введенных хэштегов по соответствию формату
  pristine.addValidator(hashtagField, isHashtagsValid, 'неверный формат хэштегов');

  //проверка хэштегов на уникальность
  const isHashtagUnique = function () {
    const set = new Set(hashtags);
    return (set.size === hashtags.length);
  };

  pristine.addValidator(hashtagField, isHashtagUnique, 'хэштеги не должны повторяться');

  //проверка длины описания изображения
  const isDescriptionValid = function () {
    return  checkStringLength(descriptionField.value, 140);
  };

  pristine.addValidator(descriptionField, isDescriptionValid, `Максимальная длина описания - 140 символов. Ваш комментарий - ${descriptionField.value.length}`);

  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  } else {
    console.log('Форма невалидна');
  }
});

//попытка сбросить ошибки при изменении содержания полей. Сообщение об ошибке исчезает, но при повтоном
//нажатии кнопки Опубликовать, старые ошибки не дают пройти валидацию.
hashtagField.addEventListener('input', function () {
  pristine.reset();
});

descriptionField.addEventListener('input', function () {
  pristine.reset();
});
