import {getData} from './api.js';
import {setData} from './data.js';
import {getPictures} from './pictures.js';
import{postsFilter} from './posts-filter.js';
import './modal.js';
import './form-validation.js';
import './photo-filters.js';
import './photo-resize.js';


//загрузка данных с сервера, прорисовка превью постов, перерисовка постов по фильтру
getData((posts) => {
  setData(posts);
  getPictures(posts);
  postsFilter();
});
