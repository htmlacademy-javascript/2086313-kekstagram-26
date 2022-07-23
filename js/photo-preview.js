//млдуль отвечает за подстановку загружаемого изображения в предпросмотр

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoPreviewElement = document.querySelector('.img-upload__preview');
const uploadFileElement = document.querySelector('.img-upload__input');

uploadFileElement.addEventListener('change', () => {

  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {

    photoPreviewElement.children[0].src = URL.createObjectURL(file);

  }

});
