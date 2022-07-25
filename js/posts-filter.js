import { data } from './data.js';
import { getUniqueRandomInteger, toggleFilterButton, debounce } from './util.js';
import { renderPictures } from './pictures.js';

//модуль отвечает за сортировку ранее опубликованных постов
const FILTER_ACTIV_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_POSTS_AMOUNT = 10;
const RERENDER_DELAY = 500;

const postsFilter = () => {
  const postsFiltersElement = document.querySelector('.img-filters');
  const filterDefaultButtonElement = postsFiltersElement.querySelector('#filter-default');
  const filterRandomButtonElement = postsFiltersElement.querySelector('#filter-random');
  const filterDiscussedButtonElement = postsFiltersElement.querySelector('#filter-discussed');

  //включение кнопки блока с кнопками филтров
  postsFiltersElement.classList.remove('img-filters--inactive');

  //фильтр по умолчанию
  let activButton = filterDefaultButtonElement;

  //клик по кнопке с рандомными постами
  const setRandomPosts = () => {

    filterRandomButtonElement.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton,FILTER_ACTIV_BUTTON_CLASS,filterRandomButtonElement);
      activButton = filterRandomButtonElement;
      const postsDefault = data.posts;
      let usedIndex = [];
      const randomPosts =  [];

      for (let i = 0; i < RANDOM_POSTS_AMOUNT; i++) {
        randomPosts.push(postsDefault[getUniqueRandomInteger(0, postsDefault.length - 1, usedIndex)]);
      }
      usedIndex = [];
      renderPictures(randomPosts);
    }, RERENDER_DELAY));
  };

  //клик по кнопке с дефолтными постами
  const setDefaultPosts = () => {
    filterDefaultButtonElement.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton, FILTER_ACTIV_BUTTON_CLASS, filterDefaultButtonElement);
      activButton = filterDefaultButtonElement;
      const postsDefault = data.posts;
      renderPictures(postsDefault);
    }, RERENDER_DELAY));
  };

  //клик по кнопке с обсуждаемыми постами
  const setDiscussePosts = () => {
    filterDiscussedButtonElement.addEventListener('click', debounce(() => {
      toggleFilterButton(activButton, FILTER_ACTIV_BUTTON_CLASS, filterDiscussedButtonElement);
      activButton = filterDiscussedButtonElement;
      const postsDefault = data.posts;
      const postsDiscussed = postsDefault.slice();
      const comparePosts = (postA, postB) => {
        const commentsAmountA = postA.comments.length;
        const commentsAmountB = postB.comments.length;
        return commentsAmountB - commentsAmountA;
      };
      postsDiscussed.sort(comparePosts);
      renderPictures(postsDiscussed);
    }, RERENDER_DELAY));
  };

  setRandomPosts();
  setDefaultPosts();
  setDiscussePosts();
};

export { postsFilter };
