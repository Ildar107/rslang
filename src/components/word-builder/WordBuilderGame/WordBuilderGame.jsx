import React, {
  useState, useEffect, useMemo,
} from 'react';
import './WordBuilderGame.scss';

const getShuffledArr = (arr) => {
  if (!arr) return [];
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const WordBuilderGame = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [guessedLettersIndexes, setGuessedLettersIndexes] = useState([]);
  // const [solved, setSolved] = useState(false);

  const currentWord = words[currentWordIndex];
  const currentLetter = currentWord?.word[currentLetterIndex];
  const shuffledArray = useMemo(() => getShuffledArr(currentWord?.word.split('')), [currentWord]);

  useEffect(() => {
    async function fetchData() {
      const WORDS_URL = 'https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0';
      const data = await fetch(WORDS_URL);
      const res = await data.json();
      const wordsArray = res.map(({
        audio, image, audioExample, textExample, transcription, word, wordTranslate,
      }) => ({
        audio: `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audio}`,
        image: `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${image}`,
        audioExample: `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audioExample}`,
        textExample: textExample.replace('<b>', '').replace('</b>', ''),
        transcription,
        word,
        wordTranslate,
      }));
      setWords(wordsArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleLetterKeyPress = ({ key }) => {
      if (currentLetter === key) {
        setGuessedLettersIndexes([...guessedLettersIndexes, shuffledArray
          .findIndex((letter, index) => letter === key && !guessedLettersIndexes.includes(index))]);
        setCurrentLetterIndex(currentLetterIndex + 1);
      }
    };
    document.addEventListener('keypress', handleLetterKeyPress);
    return () => document.removeEventListener('keypress', handleLetterKeyPress);
  });

  return (
    <div className="word-constructor-wrapper">
      <button type="button" className="audio-button" onClick={() => new Audio(currentWord.audio).play()}>s</button>
      <div className="current-progress-div">{`${currentWordIndex + 1} / 20`}</div>
      <span className="eng-word">{currentWord?.wordTranslate}</span>

      <span className="rules-span">Собери слово из букв</span>

      <span className="transcription">{currentWord?.transcription}</span>

      <div className="letter-wrapper">
        {currentWord?.word.split('')
         .map((letter, index) => (
           <div
             key={`${letter}${index + 1}`}
             className="empty-letter"
           >
             <span className={index >= currentLetterIndex ? 'hidden' : ''}>{letter}</span>
           </div>
         ))}
      </div>

      <div className="letter-wrapper">
        {shuffledArray
          .map((letter, index) => (
            <button
              key={`${letter}${index + 1}`}
              className={`letter ${guessedLettersIndexes.includes(index) ? 'hidden' : ''}`}
              type="button"
              onClick={() => {
                if (letter === currentLetter) {
                  setGuessedLettersIndexes([...guessedLettersIndexes, index]);
                  setCurrentLetterIndex(currentLetterIndex + 1);
                }
              }}
            >
              <span>{letter}</span>
            </button>
          ))}
      </div>
      <img
        src={currentWord?.image}
        alt={currentWord?.word}
        className="word-image"
      />
      <span className="context-span">Контекст</span>
      <span className="text-example-span">{currentWord?.textExample}</span>
      <button
        type="button"
        className="next-button"
        onClick={() => {
          setCurrentWordIndex(currentWordIndex + 1);
          setCurrentLetterIndex(0);
          setGuessedLettersIndexes([]);
        }}
      >
        Далее
      </button>
    </div>
  );
};

export default WordBuilderGame;
