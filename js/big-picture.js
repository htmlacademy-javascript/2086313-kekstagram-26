import { isEscapeKey } from './modal.js';

//модуль отвечает за открытие поста

//число комментариев, выводимых в блоке, класс для скрытия элементов
const COMMENTS_IN_GROUP = 5;
const HIDDEN_CLASS = 'hidden';

const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');
const imgElement = bigPictureImgElement.querySelector('img');
const bigPuctureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const shownCommentsAmountElement = bigPictureElement.querySelector('.comments-shown');
const allCommentsAmountElement = bigPictureElement.querySelector('.comments-count');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsElement.querySelector('.social__comment');

const bigPictureOpen = (post) => {
  //счетчик опубликованных комментариев
  let counter = 0;
  let lastCommentInGroup = COMMENTS_IN_GROUP;
  //очистка блока с комментариями
  commentsElement.innerHTML = '';

  const printComments = () => {
    for (let i = counter; (i < post.comments.length) && (i < lastCommentInGroup); i++) {
      const postedCommentElement = commentElement.cloneNode(true);
      const commentAvatarElement = postedCommentElement.querySelector('.social__picture');
      const commentMessage = postedCommentElement.querySelector('.social__text');
      commentAvatarElement.src = post.comments[counter].avatar;
      commentAvatarElement.alt = post.comments[counter].name;
      commentMessage.textContent = post.comments[counter].message;
      commentsElement.append(postedCommentElement);
      counter++;
    }
    lastCommentInGroup += COMMENTS_IN_GROUP;
    shownCommentsAmountElement.textContent = counter;
    if (counter === post.comments.length) {
      commentsLoaderElement.classList.add(HIDDEN_CLASS);
    }
  };

  printComments();

  //функция открытия большой картинки
  const openBigPicture = () => {
    bigPictureElement.classList.remove(HIDDEN_CLASS);
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEsc);
  };

  //функция закрытия большой картинки, сброс счетчика, удаление обработчиков
  const closeBigPicture = () => {
    bigPictureElement.classList.add(HIDDEN_CLASS);
    bodyElement.classList.remove('modal-open');
    commentsLoaderElement.classList.remove(HIDDEN_CLASS);
    counter = 0;
    document.removeEventListener('keydown', onBigPictureEsc);
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  };

  //функция вывода дополнительного блока комментариев, объявляется декларативно
  function onCommentsLoaderClick (evt)  {
    evt.preventDefault();
    printComments();
  }

  //функция закрытия большой картинки по эскейпу, объявляется декларативно
  function onBigPictureEsc (evt) {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  }

  //функция закрытия большой картинки по клику
  const onBigPuctureCancelClick = (evt) => {
    evt.preventDefault();
    closeBigPicture();
  };

  //наполнение окна данными: урл картинки, альт, описание, число лайков и комментариев
  imgElement.src = post.url;
  imgElement.alt = post.description;
  bigPictureDescriptionElement.textContent = post.description;
  bigPictureLikesElement.textContent = post.likes;
  allCommentsAmountElement.textContent = post.comments.length;

  //обработчик клика по кнопке вывода дополнительного блока комментариае
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  openBigPicture();
  //обработчкик клика по кнопке закрытия окна большой картинки
  bigPuctureCancelElement.addEventListener('click', onBigPuctureCancelClick);
};

export { bigPictureOpen };
