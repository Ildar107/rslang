/* eslint-disable react/prop-types */
import React from 'react';

const difficultyArray = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const WordBuilderDifficultySelectPage = ({ setDifficulty, setStarted }) => (
  <div className="difficulty-wrapper">
    <h1>Выберите сложность</h1>
    <ul>
      {difficultyArray.map((level, index) => (
        <li key={`${level} ${index + 1}`}>
          <button
            type="button"
            onClick={() => {
              setDifficulty(index);
              setStarted(true);
            }}
          >
            {level}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default WordBuilderDifficultySelectPage;
