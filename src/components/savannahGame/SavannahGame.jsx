/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import './savannah-game.scss';
import { Container, Row, Col } from 'react-bootstrap';

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const SavannahGame = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setWordIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${currentPage}&group=${currentGroup}`;
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
      const shuffleArr = getShuffledArr(wordsArray);
      setWords(shuffleArr);
    }
    fetchData();
  }, []);
  const currentWord = words[currentWordIndex];
  const getWords = () => {
    const currentWords = words.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index <= 3) {
        return <Col className="word" sm>{item && item.word}</Col>;
      }
    });
    return currentWords.sort(() => Math.random() - 0.5);
  };

  const animationStart = () => {
    console.log('start');
  };

  const animationEnd = () => {
    setWordIndex(currentWordIndex + 1);
  };

  return (
    <Container className="savannah">
      <Row className="savannah__translate">
        <Col onAnimationStart={animationStart} onAnimationIteration={animationEnd} className="translate" sm><span className="translate_span">{currentWord && currentWord.wordTranslate}</span></Col>
      </Row>
      <Row className="words-block">
        {getWords()}
      </Row>
    </Container>
  );
};
export default SavannahGame;
