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
      console.log(wordsArray);
    }
    fetchData();
  }, []);

  return (
    <div className="word-constructor-wrapper">
      <button type="button" className="audio-button">PLAY</button>
      <span className="eng-word">{words[currentWordIndex] && words[currentWordIndex].word}</span>
      <span className="transcription">{words[currentWordIndex] && words[currentWordIndex].transcription}</span>
      <div className="letter-wrapper">
        {words[currentWordIndex]
       && words[currentWordIndex].word.split('').map((letter) => <div className="letter">{letter}</div>)}
      </div>
    </div>
  );
};
export default WordBuilderGame;
