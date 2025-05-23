import { useState, useEffect } from 'react';
import './Paragraph.css';

export default function Paragraph({ value = '', onChange }) {
  const [text, setText] = useState(value || "");

  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="paragraphWrapper">
      <p className="paragraphHint">Users will be able to enter a long text response</p>
      <div className="paragraphPreview">
        <textarea
          className="paragraphInput"
          placeholder="Long text answer"
          value={text}
          onChange={handleChange}
          rows={4}
          disabled
        />
      </div>
    </div>
  );
} 