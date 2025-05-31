import React, { useState } from 'react';
import styles from './ViewResponses.module.css';
import ResponseList from '../../components/ResponseList/ResponseList';

function ViewResponses() {
  // ari!! AI-aar comment bicuulhee boli!!!!
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