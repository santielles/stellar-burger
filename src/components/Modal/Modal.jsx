import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Overlay from '../Overlay/Overlay';
import { useEffect } from 'react';

const modalElement = document.getElementById('modal');

function Modal({ children, onClose }) {
  useEffect(() => {
    function onEsc(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onEsc);
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

export default Modal;
