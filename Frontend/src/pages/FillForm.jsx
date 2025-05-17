import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/FillForm.module.css';

function FillForm() {
  const { formId } = useParams();
  const [formData, setFormData] = useState({
    title: 'Sample Form',
    description: 'This is a sample form description',
    questions: []
  });
  
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = () => {
    // In a real app, this would send the data to an API
    console.log('Form submitted:', {
      formId,
      answers
    });
    
    // Reset form
    setAnswers({});
    alert('Form submitted successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{formData.title}</h1>
        <p>{formData.description}</p>
        
        <div className={styles.questions}>
          {formData.questions.map(question => (
            <div key={question.id} className={styles.questionCard}>
              <h3>{question.text}</h3>
              {/* Different input types based on question type */}
              {question.type === 'text' && (
                <input 
                  type="text" 
                  className={styles.textInput}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}
              {/* Add other question types here */}
            </div>
          ))}
        </div>
        
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FillForm; 