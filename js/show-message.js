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

  function isClickOutside  (evt) {
    const clickInside = message.querySelector('.success__inner').contains(evt.target);
    if (!clickInside) {
      hideMessage();
    }
  }

  function onMessagePressEsc () {
    if (isEscapeKey) {
      hideMessage();
    }
  }
};

export { showMessage };
