import './ResponseList.css';
import React from 'react';

function ResponseList({ responses = [] }) {   //
  if (responses.length === 0) {
    return <div className="noResponses">No responses yet</div>;
  }
  
  return (
    <div className="responseList">
      {responses.map((response, index) => (
        <div key={index} className="responseItem">
          <div className="responseHeader">
            <h3>Response #{index + 1}</h3>
            <span className="timestamp">
              {new Date(response.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div className="responseContent">
            {Object.entries(response.answers).map(([questionId, answer]) => (
              <div key={questionId} className="answer">
                <div className="question">{answer.question}</div>
                <div className="answerText">{answer.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseList; 