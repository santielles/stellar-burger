import { overlayType } from '../../utils/types';
import styles from './Overlay.module.css';

function Overlay({ onClose }) {
  return (
    <div className={styles.overlay} onClick={() => onClose()}></div>
  );
}

Overlay.propTypes = overlayType;

export default Overlay;
