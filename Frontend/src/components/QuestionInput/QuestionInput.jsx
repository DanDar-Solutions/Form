import React, { useState } from 'react';
import styles from './QuestionInput.module.css';
import OptionsList from '../OptionsList/OptionsList';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function QuestionInput({ id, question, onQuestionChange, onDelete, isDragging = false }) {
  const [questionType, setQuestionType] = useState('text');
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`${styles.questionCard} ${isDragging ? styles.dragging : ''}`}
    >
      <div className={styles.questionHeader}>
        <div className={styles.dragHandle} {...attributes} {...listeners}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
        
        <input
          type="text"
          className={styles.questionInput}
          value={question.text}
          onChange={(e) => onQuestionChange({ ...question, text: e.target.value })}
          placeholder="Question"
        />
        
        <select 
          className={styles.typeSelect}
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="text">Short Answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="radio">Multiple Choice</option>
          <option value="checkbox">Checkboxes</option>
        </select>
        
        <button 
          className={styles.deleteButton}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      
      {(questionType === 'radio' || questionType === 'checkbox') && (
        <OptionsList 
          options={question.options || []}
          onChange={(options) => onQuestionChange({ ...question, options })}
          type={questionType}
        />
      )}
    </div>
  );
}

export default QuestionInput; 