/* eslint-disable no-nested-ternary */
import React, {
  useState, useEffect, useMemo,
} from 'react';
import './WordBuilderMainPage.scss';
import { Container } from 'react-bootstrap';
import WordBuilderStatsPage from '../word-builder-stats/WordBuilderStatsPage';
import WordBuilderGamePage from '../word-builder-game/WordBuilderGamePage';

const getShuffledArr = (arr) => {
  if (!arr) return [];
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
const randomizePage = () => Math.floor(Math.random() * 30);

const WordBuilderMainPage = () => {
  const [wordObjects, setWordsObj] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [guessedLettersIndexes, setGuessedLettersIndexes] = useState([]);
  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  // const [started, setStarted] = useState(false);
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
      const wordsArray = res
        .map(({
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
        })).slice(0, 10);
      setWordsObj(wordsArray);
    }
    fetchData();
  }, [difficulty]);

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

    <Container fluid>
      <div className="word-constructor-wrapper">
        { finished
          ? <WordBuilderStatsPage wordObjects={wordObjects} />
          : (
            <WordBuilderGamePage
              currentWordObj={currentWordObj}
              currentWordIndex={currentWordIndex}
              solved={solved}
              currentLetterIndex={currentLetterIndex}
              shuffledArray={shuffledArray}
              guessedLettersIndexes={guessedLettersIndexes}
              currentLetter={currentLetter}
              setGuessedLettersIndexes={setGuessedLettersIndexes}
              setCurrentLetterIndex={setCurrentLetterIndex}
              setSolved={setSolved}
              nextButtonHandler={nextButtonHandler}
              setDifficulty={setDifficulty}
              difficulty={difficulty}
            />
          )}
      </div>
    </Container>
  );
};

export default WordBuilderMainPage;
