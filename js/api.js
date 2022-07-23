import {showAlert} from './util.js';

//модуль отвечает за взаимодействие с сервером

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      showAlert('Упс. Что-то пошло не так. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
