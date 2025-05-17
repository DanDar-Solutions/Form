import React from 'react';
import styles from './ResponseList.module.css';

function ResponseList({ responses = [] }) {
  if (responses.length === 0) {
    return <div className={styles.noResponses}>No responses yet</div>;
  }
  
  return (
    <div className={styles.responseList}>
      {responses.map((response, index) => (
        <div key={index} className={styles.responseItem}>
          <div className={styles.responseHeader}>
            <h3>Response #{index + 1}</h3>
            <span className={styles.timestamp}>
              {new Date(response.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div className={styles.responseContent}>
            {Object.entries(response.answers).map(([questionId, answer]) => (
              <div key={questionId} className={styles.answer}>
                <div className={styles.question}>{answer.question}</div>
                <div className={styles.answerText}>{answer.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseList; 