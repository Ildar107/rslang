/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';

const difficultyArray = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const WordBuilderGamePage = ({
  currentWordObj,
  currentWordIndex,
  solved,
  currentLetterIndex,
  shuffledArray,
  guessedLettersIndexes,
  currentLetter,
  setGuessedLettersIndexes,
  setCurrentLetterIndex,
  setSolved,
  nextButtonHandler,
  setDifficulty,
  difficulty,
  setCurrentWordIndex,
}) => (
  <>
    <div className="word-builder-nav">
      <div className="difficulty-wrapper">
        <h4 className="h4-choose-difficulty">Level</h4>
        <ul className="pagination">
          {difficultyArray.map((level, index) => (
            <li
              key={`${level} ${index + 1}`}
              className={`page-item ${difficulty === index && 'active'}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => {
                  setDifficulty(index);
                  setGuessedLettersIndexes([]);
                  setCurrentLetterIndex(0);
                  setCurrentWordIndex(0);
                  setSolved(false);
                }}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="progress-container">
        <span>
          Score
          {' '}
          {`${currentWordIndex} / 10`}
        </span>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${currentWordIndex * 10}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>

    {solved
    && (
    <button
      type="button"
      className="audio-button-solved btn btn-primary"
      onClick={() => new Audio(currentWordObj.audio).play()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
      </svg>
    </button>
    )}
    <span className="eng-word">{currentWordObj?.wordTranslate}</span>
    {solved
      ? <span className="transcription">{currentWordObj?.transcription}</span>
      : <span className="rules-span">Собери слово из букв</span>}

    <div className="letter-wrapper">
      {currentWordObj?.word.split('')
         .map((letter, index) => (
           <div
             key={`${letter}${index + 1}`}
             className={`empty-letter btn btn-primary
             ${!solved && index >= currentLetterIndex && 'disabled'}
             ${index === currentLetterIndex && 'next-letter'}`}
           >
             <span className={!solved && index >= currentLetterIndex ? 'hidden' : ''}>{letter}</span>
           </div>
         ))}
    </div>

    <div className="letter-wrapper">
      {shuffledArray
        .map((letter, index) => (
          <button
            key={`${letter}${index + 1}`}
            className={`btn btn-primary letter ${guessedLettersIndexes.includes(index) || solved ? 'hidden' : ''}`}
            type="button"
            onClick={() => {
              if (letter === currentLetter) {
                setGuessedLettersIndexes([...guessedLettersIndexes, index]);
                setCurrentLetterIndex(currentLetterIndex + 1);
                if (currentLetterIndex === currentWordObj?.word.length - 1) {
                  setSolved(true);
                }
              } else {
                currentWordObj.status = false;
              }
            }}
          >
            <span>{letter}</span>
          </button>
        ))}
    </div>
    {solved
      && (
      <img
        src={currentWordObj?.image}
        alt={currentWordObj?.word}
        className="word-image"
      />
      )}
    {solved
      && <span className="context-span">Контекст</span>}
    {solved
      && <span className="text-example-span">{currentWordObj?.textExample}</span>}

    <button
      type="button"
      className={`next-button btn btn-secondary ${solved && 'btn-success'}`}
      onMouseDown={nextButtonHandler}
    >
      {solved ? 'Далее' : 'Не знаю :('}
    </button>
  </>
);

export default WordBuilderGamePage;
