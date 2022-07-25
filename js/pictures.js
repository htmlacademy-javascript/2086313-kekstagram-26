import { bigPictureOpen } from './big-picture.js';

//модуль отвечает за прорисовку постов на сайте
const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const removePictures = () => {
  const pictures = picturesContainerElement.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderPictures = (posts) => {
  removePictures();
  posts.forEach((post) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.addEventListener('click', () => bigPictureOpen(post));
    const pictureImg = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');
    pictureImg.src = post.url;
    pictureComments.textContent = post.comments.length;
    pictureLikes.textContent = post.likes;
    fragment.append(picture);
  });
  picturesContainerElement.append(fragment);
};

export { renderPictures };
