import React, { useState, useEffect } from 'react';
import './WordBuilderGame.scss';

const WordBuilderGame = () => {
  const [words, setWords] = useState([]);

  useEffect(async () => {
    const WORDS_URL = 'https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0';
    const data = await fetch(WORDS_URL);
    const res = await data.json();
    const wordsArray = res.map(({
      audio, image, audioExample, textExample, transcription, word, wordTranslate,
    }) => ({
      audio, image, audioExample, textExample, transcription, word, wordTranslate,
    }));
    setWords(wordsArray);
    console.log(wordsArray);
  }, []);

  return (
    <div className="word-constructor-wrapper">{words.length}</div>
  );
};
export default WordBuilderGame;
