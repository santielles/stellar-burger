import styles from './Overlay.module.css';

function Overlay({ onClose }) {
  return (
    <div className={styles.overlay} onClick={() => onClose()}></div>
  );
}

export default Overlay;
