import React, { useState, useEffect } from 'react';
import './WordBuilderGame.scss';

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const WordBuilderGame = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex] = useState(5);

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
  const currentWord = words[currentWordIndex];
  return (
    <div className="word-constructor-wrapper">
      <button type="button" className="audio-button" onClick={() => new Audio(currentWord.audio).play()}>s</button>
      <div className="current-progress-div">{`${currentWordIndex + 1} / 20`}</div>
      <span className="eng-word">{currentWord && currentWord.wordTranslate}</span>

      <span className="rules-span">Собери слово из букв</span>

      <span className="transcription">{currentWord && currentWord.transcription}</span>

      <div className="letter-wrapper">
        {currentWord
       && currentWord.word.split('').map(() => <div className="empty-letter">{}</div>)}
      </div>

      <div className="letter-wrapper">
        {currentWord
       && getShuffledArr(currentWord.word.split('')).map((letter) => <div className="letter">{letter}</div>)}
      </div>
      <img
        src={currentWord && currentWord.image}
        alt={currentWord && currentWord.word}
        className="word-image"
      />
      <span className="context-span">Контекст</span>
      <span className="text-example-span">{currentWord && currentWord.textExample}</span>
      <button type="button" className="next-button">Далее</button>
    </div>
  );
};
export default WordBuilderGame;
