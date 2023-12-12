import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Overlay from '../Overlay/Overlay';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalElement = document.getElementById('modal');

function Modal({ children, onClose }) {
  useEffect(() => {
    // задаём функцию, котрая при нажатии на "Escape" будет закрывать модальное окно
    function onEsc(evt) {
      // если нажата клавиша "Escape"
      if (evt.code === 'Escape') {
        // закрыть модальное окно
        onClose();
      }
    }
    // вешаем эту функцию на event нажатия любой клавиши
    document.addEventListener('keydown', onEsc);

    // "return" в "useEffect" задаёт так называемую "фунцию очистки", которая будет вызвана
    // 1. перед повторным запуском эффекта
    // (наш случай) 2. при размонтировании компонента когда компонент удаляется из DOM
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return createPortal(
    (
      <>
        <div className={styles.modal}>
          <button className={`${styles.close} mt-10 mr-10`} onClick={() => onClose()}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
        <Overlay onClose={onClose} />
      </>
    ), modalElement
  );
}


Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Modal;
