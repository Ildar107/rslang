import React, {
  useState, useEffect, useMemo,
} from 'react';
import './WordBuilderGame.scss';
import WordBuilderStats from '../../word-builder-stats/WordBuilderStats';

const getShuffledArr = (arr) => {
  if (!arr) return [];
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
const randomizePage = () => Math.floor(Math.random() * 20);

const WordBuilderGame = () => {
  const [wordObjects, setWordsObj] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [guessedLettersIndexes, setGuessedLettersIndexes] = useState([]);
  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  const currentWordObj = wordObjects[currentWordIndex];
  const currentLetter = currentWordObj?.word[currentLetterIndex];
  const shuffledArray = useMemo(() => getShuffledArr(currentWordObj?.word.split('')), [currentWordObj]);

  const nextButtonHandler = () => {
    if (solved && !(currentWordIndex === wordObjects.length - 1)) {
      setSolved(false);
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentLetterIndex(0);
      setGuessedLettersIndexes([]);
    } else if (!solved) {
      currentWordObj.status = false;
      setSolved(true);
    } else if (solved && (currentWordIndex === wordObjects.length - 1)) {
      setFinished(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const page = randomizePage();
      const WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${difficulty}`;
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
        status: true,
      }));
      setWordsObj(wordsArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleLetterKeyPress = ({ key }) => {
      if (currentLetter === key) {
        setGuessedLettersIndexes([...guessedLettersIndexes, shuffledArray
          .findIndex((letter, index) => letter === key && !guessedLettersIndexes.includes(index))]);
        setCurrentLetterIndex(currentLetterIndex + 1);
        if (currentLetterIndex === currentWordObj?.word.length - 1) {
          setSolved(true);
        }
      } else if (key === 'Enter') {
        nextButtonHandler();
      } else if (currentLetter !== key) {
        currentWordObj.status = false;
      }
    };
    document.addEventListener('keypress', handleLetterKeyPress);
    return () => document.removeEventListener('keypress', handleLetterKeyPress);
  });
  return (
    <div className="word-constructor-wrapper">
      {finished
        ? <WordBuilderStats wordObjects={wordObjects} />
        : (
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
        )}

    </div>
  );
};

export default WordBuilderGame;
