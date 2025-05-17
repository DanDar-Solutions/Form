import React, { useState } from 'react';
import styles from './FormTitle.module.css';

function FormTitle({ title, description, onTitleChange, onDescriptionChange }) {
  return (
    <div className={styles.formTitle}>
      <input
        type="text"
        className={styles.titleInput}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Form Title"
      />
      <input
        type="text"
        className={styles.descriptionInput}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Form Description"
      />
    </div>
  );
}

export default FormTitle; 