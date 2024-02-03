import styles from './Overlay.module.css';

interface OverlayProps {
  onClose: () => void;
}

function Overlay({ onClose }: OverlayProps): React.ReactElement {
  return (
    <div className={styles.overlay} onClick={() => onClose()}></div>
  );
}

export default Overlay;
