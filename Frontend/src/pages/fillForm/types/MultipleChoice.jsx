import React from 'react';

export default function Rtype1({ question }) {
  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            id={`${question._id}-${i}`}
            name={question._id}
            value={option}
          />
          <label htmlFor={`${question._id}-${i}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
