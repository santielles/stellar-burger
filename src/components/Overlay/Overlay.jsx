import styles from './Overlay.module.css';
import PropTypes from 'prop-types';

function Overlay({ onClose }) {
  return (
    <div className={styles.overlay} onClick={() => onClose()}></div>
  );
}

Overlay.propTypes = {
  onClose: PropTypes.func
};

export default Overlay;
