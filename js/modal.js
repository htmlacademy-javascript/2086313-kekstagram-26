//модуль отвечает за открытие и закрытие модального окна редактирования загружаемого изображения

const buttonClose = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const bodyDocument = document.querySelector('body');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');

//функция переключения классов для открытия или закрытия модального окна
const OpenOrCloseModal =  () => {
  uploadFileOverlay.classList.toggle('hidden');
  bodyDocument.classList.toggle('modal-open');
};

//отмена закрытия формы по эскейпу при фокусе в поле ввода
hashtagField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
descriptionField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//открытие формы редактирования изображения после загрузки файла
uploadFile.addEventListener('change', () => {
  OpenOrCloseModal();
});

//закрытие формы редактирования изображения
buttonClose.addEventListener('click', () => {
  OpenOrCloseModal();
  uploadForm.reset();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    OpenOrCloseModal();
    uploadForm.reset();
  }
});
