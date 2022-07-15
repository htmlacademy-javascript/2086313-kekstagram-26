import {genPosts} from './data.js';
import {getPictures} from './pictures.js';
import './modal.js';
import './form-validation.js';
import './photo-filters.js';
import './photo-resize.js';

//создание постов
const posts = genPosts();

//прорисовка постов на сайте
getPictures(posts);
