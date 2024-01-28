import { createPortal } from 'react-dom';
import styles from './Preloader.module.css';

const preloaderElement = document.getElementById('preloader');

function Preloader() {
  return createPortal(
    (
      <div className={styles.preloader}>
        <h1 className="text text_type_main-large text_color_inactive mb-30 mt-30">Идёт загрузка...</h1>
      </div>
    ), preloaderElement
  );
}

export default Preloader;
