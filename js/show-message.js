import { isEscapeKey } from './modal.js';

//функция добавления сообщения о результате отправки и удаление по esc и кнопке
const showMessage = (message, button) => {
  const hideMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onMessagePressEsc);
    document.removeEventListener('click', isClickOutside);
  };

  document.body.append(message);
  button.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessagePressEsc);
  document.addEventListener('click', isClickOutside);

  //функция закрытия сообщения по клику за пределами блока сообщения, объявляется декларативно, чтобы
  //благодаря всплытию этот обработчик можно было удалить выше по коду в hideMessage()
  function isClickOutside  (evt) {
    const clickInside = message.querySelector('.success__inner').contains(evt.target);
    if (!clickInside) {
      hideMessage();
    }
  }

  //функция закрытия сообщения по нажатию ESC, объявляется декларативно, чтобы
  //благодаря всплытию этот обработчик можно было удалить выше по коду в hideMessage()
  function onMessagePressEsc () {
    if (isEscapeKey) {
      hideMessage();
    }
  }
};

export { showMessage };
