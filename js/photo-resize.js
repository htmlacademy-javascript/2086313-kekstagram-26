//модуль отвечает за масштабирование превью загружаемого изображения

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const imgUploadPreviewElement = document.querySelector('.img-upload__preview');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');

//задаем масштаб по умолчанию
let scale = SCALE_MAX;
scaleControlValueElement.value = `${scale}%`;

//запись масштаба в стиль картинки
const getScaleStyle = () => {

  scaleControlValueElement.value = `${scale}%`;
  imgUploadPreviewElement.children[0].style.transform = `scale(${scale/100})`;

};

const resetScale = () => {

  scale = SCALE_MAX;
  getScaleStyle();

};


scaleControlSmallerElement.addEventListener('click', () => {

  if (scale === SCALE_MIN) {

    return;

  }

  scale -= SCALE_STEP;
  getScaleStyle();

});

scaleControlBiggerElement.addEventListener('click', () => {

  if (scale === SCALE_MAX) {

    return;

  }

  scale += SCALE_STEP;
  getScaleStyle();

});

export {resetScale};
