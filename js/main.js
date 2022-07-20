import {getData} from './api.js';
import {getPictures} from './pictures.js';
import './modal.js';
import './form-validation.js';
import './photo-filters.js';
import './photo-resize.js';


//загрузка данных с сервера и прорисовка превью постов
getData((posts) => {
  getPictures(posts);
});
