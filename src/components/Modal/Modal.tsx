import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Overlay from '../Overlay/Overlay';
import { useEffect } from 'react';

const modalElement = document.getElementById('modal') as HTMLElement;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps): React.ReactElement {
  useEffect(() => {
    // задаём функцию, котрая при нажатии на "Escape" будет закрывать модальное окно
    function onEsc(evt: KeyboardEvent) {
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

export default Modal;
