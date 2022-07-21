import {data} from './data.js';
import {getUniqueRandomInteger, toggleFilterButton, debounce} from './util.js';
import {getPictures} from './pictures.js';

const FILTER_ACTIV_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_POSTS_AMOUNT = 10;
const RERENDER_DELAY = 500;

const postsFilter = () => {
  const postsFiltersElement = document.querySelector('.img-filters');
  const filterDefaultButton = postsFiltersElement.querySelector('#filter-default');
  const filterRandomButton = postsFiltersElement.querySelector('#filter-random');
  const filterDiscussedButton = postsFiltersElement.querySelector('#filter-discussed');

  //включение кнопки блока с кнопками филтров
  postsFiltersElement.classList.remove('img-filters--inactive');

  //фильтр по умолчанию
  let activButton = filterDefaultButton;

  //клик по кнопке с рандомными постами
  const setRandomPosts = () => {
    filterRandomButton.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton,FILTER_ACTIV_BUTTON_CLASS,filterRandomButton);
      activButton = filterRandomButton;
      const postsDefault = data.posts;
      let usedIndex = [];
      const randomPosts =  [];
      for (let i = 0; i < RANDOM_POSTS_AMOUNT; i++) {
        randomPosts.push(postsDefault[getUniqueRandomInteger(0, postsDefault.length - 1, usedIndex)]);
      }
      usedIndex = [];
      getPictures(randomPosts);
    }, RERENDER_DELAY));
  };

  //клик по кнопке с дефолтными постами
  const setDefaultPosts = () => {
    filterDefaultButton.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton, FILTER_ACTIV_BUTTON_CLASS, filterDefaultButton);
      activButton = filterDefaultButton;
      const postsDefault = data.posts;
      getPictures(postsDefault);
    }, RERENDER_DELAY));
  };

  //клик по кнопке с обсуждаемыми постами
  const setDiscussePosts = () => {
    filterDiscussedButton.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton, FILTER_ACTIV_BUTTON_CLASS, filterDiscussedButton);
      activButton = filterDiscussedButton;
      const postsDefault = data.posts;
      const postsDiscussed = postsDefault.slice();
      const comparePosts = (postA, postB) => {
        const commentsAmountA = postA.comments.length;
        const commentsAmountB = postB.comments.length;
        return commentsAmountB - commentsAmountA;
      };
      postsDiscussed.sort(comparePosts);
      getPictures(postsDiscussed);
    }, RERENDER_DELAY));
  };

  setRandomPosts();
  setDefaultPosts();
  setDiscussePosts();
};

export {postsFilter};
