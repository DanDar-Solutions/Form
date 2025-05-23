import React, { useState } from 'react';
import './QuestionInput.css';
import Date from './types/dates/Date';
import Time from './types/dates/Time';
import MultipleChoiceGrid from './types/choices/MultipleChoiceGrid';
import Connect from './types/advanced/Connect';
import Swap from './types/advanced/Swap';
import ShortAnswer from './types/ShortAnswer';
import Paragraph from './types/Paragraph';
import MultipleChoice from './types/choices/MultipleChoice';
import Checkboxes from './types/choices/Checkboxes';
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
      className={`questionCard ${isDragging ? 'dragging' : ''}`}
    >
      <div className="questionHeader">
        <div className="dragHandle" {...attributes} {...listeners}>
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
          className="questionInput"
          value={question.text}
          onChange={(e) => onQuestionChange({ ...question, text: e.target.value })}
          placeholder="Question"
        />
        
        <select 
          className="typeSelect"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="text">Short Answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="radio">Multiple Choice</option>
          <option value="checkbox">Checkboxes</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="grid">Multiple Choice Grid</option>
          <option value="connect">Connect</option>
          <option value="swap">Swap</option>
        </select>
        
        <button 
          className="deleteButton"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      
      {questionType === 'text' && (
        <ShortAnswer 
          onChange={(value) => onQuestionChange({ ...question, shortAnswerValue: value })}
          value={question.shortAnswerValue}
        />
      )}
      
      {questionType === 'paragraph' && (
        <Paragraph 
          onChange={(value) => onQuestionChange({ ...question, paragraphValue: value })}
          value={question.paragraphValue}
        />
      )}
      
      {questionType === 'radio' && (
        <MultipleChoice 
          options={question.options || []}
          onChange={(options) => onQuestionChange({ ...question, options })}
        />
      )}
      
      {questionType === 'checkbox' && (
        <Checkboxes 
          options={question.options || []}
          onChange={(options) => onQuestionChange({ ...question, options })}
        />
      )}
      
      {questionType === 'date' && (
        <Date 
          onChange={(value) => onQuestionChange({ ...question, dateValue: value })}
          value={question.dateValue}
        />
      )}
      
      {questionType === 'time' && (
        <Time 
          onChange={(value) => onQuestionChange({ ...question, timeValue: value })}
          value={question.timeValue}
        />
      )}
      
      {questionType === 'grid' && (
        <MultipleChoiceGrid 
          options={question.gridOptions || {rows: [], columns: []}}
          onChange={(gridOptions) => onQuestionChange({ ...question, gridOptions })}
        />
      )}
      
      {questionType === 'connect' && (
        <Connect 
          options={question.connectOptions || {left: [], right: []}}
          onChange={(connectOptions) => onQuestionChange({ ...question, connectOptions })}
        />
      )}
      
      {questionType === 'swap' && (
        <Swap 
          options={question.swapOptions || []}
          onChange={(swapOptions) => onQuestionChange({ ...question, swapOptions })}
        />
      )}
    </div>
  );
}

export default QuestionInput; 