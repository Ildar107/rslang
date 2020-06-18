import React, { useState, useEffect } from 'react';
import './WordBuilderGame.scss';

const WordBuilderGame = () => {
  const [words, setWords] = useState([]);
  // https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/files/01_0009_example.mp3
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
      <div className="audio-button">PLAY</div>
      <span className="eng-word">{words[0] && words[0].word}</span>
    </div>
  );
};
export default WordBuilderGame;
