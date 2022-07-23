//модуль отвечает за сохранение данных, загруженных с сервера

const data = {
  posts: [],
};

const setData = (posts) => {
  data.posts = posts;
};

export {data, setData};
