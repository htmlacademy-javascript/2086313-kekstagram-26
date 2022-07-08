import {genPosts} from './data.js';
import {getPictures} from './pictures.js';
import './modal.js';
import './form-validation.js';


//создание постов
const posts = genPosts();

//прорисовка постов на сайте
getPictures(posts);


//работа с формой. вынести в модули
const bodyDocument = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

//отмена закрытия формы по эскейпу при фокусе в поле ввода
hashtagField.addEventListener('keydown', (event) => {
  event.stopPropagation();
});
descriptionField.addEventListener('keydown', (event) => {
  event.stopPropagation();
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
