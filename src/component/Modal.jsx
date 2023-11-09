
import styles from '../assets/styles/modal.module.css';
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton}>
                    <button type="button" onClick={onClose}>
                        X
                    </button>
                </span>
                <h2 className={styles.title}>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
