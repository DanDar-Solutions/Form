import React from 'react';
import styles from './OptionsList.module.css';

function OptionsList({ options, onChange, type }) {
  const addOption = () => {
    onChange([...options, { id: Date.now(), text: '' }]);
  };

  const updateOption = (id, text) => {
    onChange(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const removeOption = (id) => {
    onChange(options.filter(option => option.id !== id));
  };

  return (
    <div className={styles.optionsList}>
      {options.map(option => (
        <div key={option.id} className={styles.optionItem}>
          <div className={styles.optionControl}>
            {type === 'radio' ? (
              <div className={styles.radioIcon}></div>
            ) : (
              <div className={styles.checkboxIcon}></div>
            )}
          </div>
          
          <input
            type="text"
            className={styles.optionInput}
            value={option.text}
            onChange={(e) => updateOption(option.id, e.target.value)}
            placeholder="Option"
          />
          
          <button 
            className={styles.removeOption}
            onClick={() => removeOption(option.id)}
          >
            ✕
          </button>
        </div>
      ))}
      
      <button 
        className={styles.addOptionButton}
        onClick={addOption}
      >
        Add Option
      </button>
    </div>
  );
}

export default OptionsList; 