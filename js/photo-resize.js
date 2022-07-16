//масштабирование превью загружаемого изображения
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

//задаем масштаб по умолчанию
let scale = SCALE_MAX;
scaleControlValue.value = `${scale}%`;

//запись масштаба в стиль картинки
const getScaleStyle = () => {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.children[0].style.transform = `scale(${scale/100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (scale === SCALE_MIN) {
    return;
  }
  scale -= SCALE_STEP;
  getScaleStyle();
});

scaleControlBigger.addEventListener('click', () => {
  if (scale === SCALE_MAX) {
    return;
  }
  scale += SCALE_STEP;
  getScaleStyle();
});
