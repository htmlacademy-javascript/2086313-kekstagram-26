import {getData} from './api.js';
import {setData} from './data.js';
import {renderPictures} from './pictures.js';
import {postsFilter} from './posts-filter.js';
import './photo-preview.js';
import './modal.js';
import './form-validation.js';
import './photo-filters.js';
import './photo-resize.js';


//загрузка данных с сервера, прорисовка превью постов, перерисовка постов по фильтру
getData((posts) => {

  setData(posts);
  renderPictures(posts);
  postsFilter();

});
