import React, { useState, useEffect } from 'react';
import './WordBuilderGame.scss';

const WordBuilderGame = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex] = useState(0);

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
        textExample,
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
      <span className="eng-word">{currentWord && currentWord.wordTranslate}</span>
      <span className="transcription">{currentWord && currentWord.transcription}</span>
      <div className="letter-wrapper">
        {currentWord
       && currentWord.word.split('').map((letter) => <div className="letter">{letter}</div>)}
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
