import {showAlert} from './util.js';

//showAlert('Не удалось отправить форму. Попробуйте ещё раз')
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
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
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,  //записать в переменную теле запроса
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();  //написать функцию отправки
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз'); //подставить функцию алерта
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
