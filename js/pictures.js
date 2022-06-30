//прорисовка постов на сайте

const getPictures = function (posts) {

  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureImg.src = post.url;
    pictureComments.textContent = post.comments.length;
    pictureLikes.textContent = post.likes;
    fragment.append(picture);
  });

  picturesContainer.append(fragment);
};

export {getPictures};
