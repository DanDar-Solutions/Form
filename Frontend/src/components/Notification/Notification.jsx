import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';

function Notification({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message || !visible) return null;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeButton} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  );
}

export default Notification; 