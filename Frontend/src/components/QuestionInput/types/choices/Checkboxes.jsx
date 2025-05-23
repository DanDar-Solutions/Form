import { useState, useEffect } from 'react';
import './Checkboxes.css';

export default function Checkboxes({ options = [], onChange }) {
  const [items, setItems] = useState(options || []);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(items)) {
      setItems(options);
    }
  }, [options]);

  const addOption = () => {
    const newItems = [...items, { id: Date.now(), text: '' }];
    setItems(newItems);
    onChange(newItems);
  };

  const updateOption = (id, text) => {
    const newItems = items.map(item => item.id === id ? { ...item, text } : item);
    setItems(newItems);
    onChange(newItems);
  };

  const removeOption = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    onChange(newItems);

    setSelectedOptions(prev => prev.filter(optionId => optionId !== id));
  };

  const toggleSelect = (id) => {
    setSelectedOptions(prev => {
      if (prev.includes(id)) {
        return prev.filter(optionId => optionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="checkboxesWrapper">
      <div className="optionsSection">
        <p className="optionsHint">Add options for users to select multiple answers</p>
        
        {items.map((option, index) => (
          <div key={option.id} className="optionItem">
            <div className="checkboxIcon">
              <div className="checkboxSquare"></div>
            </div>
            
            <input
              type="text"
              className="optionInput"
              value={option.text}
              onChange={e => updateOption(option.id, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            
            <button 
              className="removeButton"
              onClick={() => removeOption(option.id)}
            >
              ✕
            </button>
          </div>
        ))}
        
        <button className="addButton" onClick={addOption}>
          Add Option
        </button>
      </div>
      
      {items.length > 0 && (
        <div className="previewSection">
          <h4>Preview</h4>
          <div className="optionsPreview">
            {items.map(option => (
              <div key={option.id} className="previewItem">
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    className="checkboxInput"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => toggleSelect(option.id)}
                  />
                  <span className="checkboxLabelText">{option.text || `Untitled Option`}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 