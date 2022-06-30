import {genPosts} from './data.js';
import {getPictures} from './pictures.js';

//создание постов
const posts = genPosts();

//прорисовка постов на сайте
getPictures(posts);
