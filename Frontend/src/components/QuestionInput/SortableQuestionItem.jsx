import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuestionInput from './QuestionInput';
import styles from './SortableQuestionItem.module.css';

function SortableQuestionItem({ id, question, onQuestionChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={styles.sortableItem}
    >
      <div className={styles.questionContent}>
        <QuestionInput
          id={id}
          question={question}
          onQuestionChange={onQuestionChange}
          onDelete={onDelete}
          dragHandle={
            <div className={styles.dragHandle} {...attributes} {...listeners}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="1" fill="#888"/>
                <circle cx="3" cy="6" r="1" fill="#888"/>
                <circle cx="3" cy="9" r="1" fill="#888"/>
                <circle cx="6" cy="3" r="1" fill="#888"/>
                <circle cx="6" cy="6" r="1" fill="#888"/>
                <circle cx="6" cy="9" r="1" fill="#888"/>
                <circle cx="9" cy="3" r="1" fill="#888"/>
                <circle cx="9" cy="6" r="1" fill="#888"/>
                <circle cx="9" cy="9" r="1" fill="#888"/>
              </svg>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default SortableQuestionItem; 