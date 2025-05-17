import React, { useState } from 'react';
import styles from '../styles/ViewResponses.module.css';
import ResponseList from '../components/ResponseList/ResponseList';

function ViewResponses() {
  // Dummy data for testing - in a real app, this would come from an API
  const [responses, setResponses] = useState([]);

  return (
    <div className={styles.container}>
      <h1>Form Responses</h1>
      <div className={styles.statsContainer}>
        <div className={styles.stat}>
          <h3>Total Responses</h3>
          <p>{responses.length}</p>
        </div>
      </div>
      
      <div className={styles.responsesList}>
        <ResponseList responses={responses} />
      </div>
    </div>
  );
}

export default ViewResponses; 