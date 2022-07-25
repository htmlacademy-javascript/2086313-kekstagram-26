import { resetForm } from './form-validation.js';

//модуль отвечает за открытие и закрытие модального окна редактирования загружаемого изображения
const buttonCloseElement = document.querySelector('#upload-cancel');
const uploadFileElement = document.querySelector('#upload-file');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const bodyDocumentElement = document.querySelector('body');
const uploadFileOverlayElement = document.querySelector('.img-upload__overlay');

//функция сброса поля файла
const resetUploadFile = () => {
  uploadFileElement.value = '';
};

//функция переключения классов для открытия или закрытия модального окна при загрузке
const toggleClasses =  () => {
  uploadFileOverlayElement.classList.toggle('hidden');
  bodyDocumentElement.classList.toggle('modal-open');
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

//функция для скрытия модального окна по эскейпу, объявляется декларативно чтобы
//благодаря всплытию этот обработчик можно было удалить выше по коду в closeModal()
function onModalPressEsc (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
    resetForm();
  }
}

//отмена закрытия формы по эскейпу при фокусе в поле ввода
hashtagFieldElement.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

descriptionFieldElement.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//открытие формы редактирования изображения после загрузки файла
uploadFileElement.addEventListener('change', () => {
  openModal();
});

//закрытие формы редактирования изображения по кнопке и сброс формы
//необходима отмена действия по умлчанию, тк у кнопки тип ресет, а мы "правильно" сбрасываем форму
buttonCloseElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
  resetForm();
});

export{ toggleClasses, closeModal, resetUploadFile, isEscapeKey };
