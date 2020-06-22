/* eslint-disable react/prop-types */
import React from 'react';

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
}) => (
  <>
    <button type="button" className="audio-button" onClick={() => new Audio(currentWordObj.audio).play()}>s</button>
    <div className="current-progress-div">{`${currentWordIndex + 1} / 20`}</div>
    <span className="eng-word">{currentWordObj?.wordTranslate}</span>

    {solved
      ? <span className="transcription">{currentWordObj?.transcription}</span>
      : <span className="rules-span">Собери слово из букв</span>}

    <div className="letter-wrapper">
      {currentWordObj?.word.split('')
         .map((letter, index) => (
           <div
             key={`${letter}${index + 1}`}
             className="empty-letter"
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
            className={`letter ${guessedLettersIndexes.includes(index) || solved ? 'hidden' : ''}`}
            type="button"
            onClick={() => {
              if (letter === currentLetter) {
                setGuessedLettersIndexes([...guessedLettersIndexes, index]);
                setCurrentLetterIndex(currentLetterIndex + 1);
                if (currentLetterIndex === currentWordObj?.word.length - 1) {
                  setSolved(true);
                }
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
      className="next-button"
      onMouseDown={nextButtonHandler}
    >
      {solved ? 'Далее' : 'Не знаю :('}
    </button>
  </>
);

export default WordBuilderGamePage;
