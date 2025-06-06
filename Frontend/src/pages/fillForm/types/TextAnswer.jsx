import React from 'react';

export default function Rtype4({ question, userAnswer }) {
  const isCorrect = userAnswer === question.shortAnswerValue;

  return (
    <div>
      <h3>{question.text}</h3>
      <input
        type="text"
        placeholder="answer"
        value={userAnswer}
        style={{ borderColor: isCorrect ? 'green' : 'red' }}
        readOnly
      />
    </div>
  );
}