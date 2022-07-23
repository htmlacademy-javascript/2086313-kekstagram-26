//модуль отвечает за наложение визульного эффекта на загружаемое изображение

//фильтр по умолчанию
const DEFAULT_FILTER = 'none';

//настройки слайдеров
const FiltersSettings = {
  CHROME : {
    MIN : 0,
    MAX : 1,
    STEP : 0.1,
    getFilterStyle : (value) => `grayscale(${value})`,
  },

  SEPIA : {
    MIN : 0,
    MAX : 1,
    STEP : 0.1,
    getFilterStyle : (value) => `sepia(${value})`,
  },

  MARVIN : {
    MIN : 0,
    MAX : 100,
    STEP : 1,
    getFilterStyle : (value) => `invert(${value}%)`,
  },

  PHOBOS : {
    MIN : 0,
    MAX : 3,
    STEP : 0.1,
    getFilterStyle : (value) =>  `blur(${value}px)`,
  },

  HEAT : {
    MIN : 1,
    MAX : 3,
    STEP : 0.1,
    getFilterStyle : (value) => `brightness(${value})`,
  },
};

//коллекция радиокнопок
const effectButtonsElement = document.querySelectorAll('.effects__radio');
//элемент со слайдером
const sliderFieldsetElement = document.querySelector('.img-upload__effect-level');
//див для вставки слайдера
const sliderElement = sliderFieldsetElement.querySelector('.effect-level__slider');
//поле ввода в форму значения слайдера
const effectLevelValueElement = sliderFieldsetElement.querySelector('.effect-level__value');
//див с превью фотографии
const imgUploadPreviewElement = document.querySelector('.img-upload__preview');


//создаем класс фильтра
const getCheckedClass = (filterName) => `effects__preview--${filterName}`;

//добавляем новый класс, удаляем предыдущий
const changeClass = (newFilterName, oldFilterName) => {

  const newClass = getCheckedClass(newFilterName);
  const oldClass = getCheckedClass(oldFilterName);
  imgUploadPreviewElement.children[0].classList.add(newClass);
  imgUploadPreviewElement.children[0].classList.remove(oldClass);

};

//текущий фильтр по умолчанию
let currentClassName = DEFAULT_FILTER;

//reset filter
const resetFilter = () => {

  sliderFieldsetElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  imgUploadPreviewElement.children[0].style.filter = 'none';
  currentClassName = DEFAULT_FILTER;
  imgUploadPreviewElement.children[0].classList.remove(getCheckedClass(DEFAULT_FILTER));
  effectButtonsElement[0].checked = true;

};


//создание слайдера
noUiSlider.create(sliderElement, {

  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
    ,
  },

});

//обновление параметров слайдера при выборе фильтра
const changeSliderSettings = (FilterName) => {

  sliderElement.noUiSlider.updateOptions({

    range: {
      min: FiltersSettings[FilterName.toUpperCase()].MIN,
      max: FiltersSettings[FilterName.toUpperCase()].MAX,
    },
    start: FiltersSettings[FilterName.toUpperCase()].MAX,
    step: FiltersSettings[FilterName.toUpperCase()].STEP,

  });

};


//по выбору радиокнопки запускаем обработчик
effectButtonsElement.forEach((effectButton) => {

  effectButton.addEventListener('change', () => {

    //вызываем смену классов, меняем текущий фильтр
    changeClass(effectButton.value, currentClassName);
    currentClassName = effectButton.value;

    if (currentClassName === DEFAULT_FILTER) {

      resetFilter();

    } else {

      changeSliderSettings(currentClassName);

    }

  });

});

//передача данных со слайдера в поле формы)
sliderElement.noUiSlider.on('update', () => {

  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;

  if (currentClassName === DEFAULT_FILTER) {

    imgUploadPreviewElement.children[0].style.filter = 'none';

  } else {

    sliderFieldsetElement.classList.remove('hidden');
    const filterStyle = FiltersSettings[currentClassName.toUpperCase()].getFilterStyle(sliderValue);
    imgUploadPreviewElement.children[0].style.filter = filterStyle;

  }

});

//сброс фильтра по умолчанию
resetFilter();

export {resetFilter};
