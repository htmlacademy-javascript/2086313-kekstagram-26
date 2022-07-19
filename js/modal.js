import {resetForm} from './form-validation.js';

//модуль отвечает за открытие и закрытие модального окна редактирования загружаемого изображения
const buttonClose = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const bodyDocument = document.querySelector('body');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');

//функция сброса поля файла
const resetUploadFile = () => {
  uploadFile.value = '';
};

//функция переключения классов для открытия или закрытия модального окна
const toggleClasses =  () => {
  uploadFileOverlay.classList.toggle('hidden');
  bodyDocument.classList.toggle('modal-open');
};

//проверка нажатая клавиша ESC или нет
const isEscapeKey = (evt) => (evt.key === 'Escape');

//открытие модального окна
const openModal = () => {
  toggleClasses();
  document.addEventListener('keydown', onModalPressEsc);
};

//закрытие модального
const closeModal = () =>{
  toggleClasses();
  document.removeEventListener('keydown', onModalPressEsc);
};

//функция для скрытия модального окна по эскейпу (вставляется в обработчик нажатия клавиш)
//рекурсивная функция, ссылающаяся на функцию, которая ее вызывает, поэтому объявляем декларативно
function onModalPressEsc (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
    resetForm();
  }
}

//отмена закрытия формы по эскейпу при фокусе в поле ввода
hashtagField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
descriptionField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//открытие формы редактирования изображения после загрузки файла
uploadFile.addEventListener('change', () => {
  openModal();
});

//закрытие формы редактирования изображения по кнопке и сброс формы
//необходима отмена действия по умлчанию, тк у кнопки тип ресет, а мы "правильно" сбрасываем форму
buttonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
  resetForm();
});

export{toggleClasses, closeModal, resetUploadFile, isEscapeKey};
