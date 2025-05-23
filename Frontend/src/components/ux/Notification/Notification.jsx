import React, { useState, useEffect } from 'react';
import './Notification.css';

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
    <div className={`notification ${type}`}>
      <div className="message">{message}</div>
      <button className="closeButton" onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  );
}

export default Notification; 