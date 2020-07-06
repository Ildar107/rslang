/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Container, Row, Pagination, Col,
} from 'react-bootstrap';
import Header from '../header/Header';
import SprintField from './SprintField';
import Timer from './timer ';
import './sprint-game.scss';

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const minPage = 0;
const maxPage = 29;
const falseTranslate = 0;
const trueTranslate = 1;
const minWordIndex = 0;

class SprintGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      group: 0,
      words: [],
      activePage: 0,
      activeGroup: 0,
      score: 0,
      indexTranslate: 0,
      currentCoupleOfWords: [],
    };
  }

  componentDidMount = () => {
    const page = randomInteger(minPage, maxPage);
    this.getWords(0, 0)
      .then(() => {
        this.setWordIndex();
      })
      .then(() => {
        this.getCoupleOfWords();
      });
  }

  /* componentDidUpdate = (prevProps, prevState) => {
    if (prevState.words.length !== this.state.words.length) {

    }
  } */

  setArrayOfWords = (arr) => {
    this.setState({
      words: arr,
    });
  }

  getWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    const shuffeledWords = await getShuffledArr(json);
    await this.setArrayOfWords(shuffeledWords);
  };

  setWordIndex = () => {
    const currentIndexTranslate = randomInteger(falseTranslate, trueTranslate);
    this.setState({
      indexTranslate: currentIndexTranslate,
    });
  }

  nextWord = async () => {
    const currentWordArr = await [...this.state.words];
    await currentWordArr.pop();
    const newShuffeledArr = await getShuffledArr(currentWordArr);
    await this.setWordIndex();
    await this.setArrayOfWords(newShuffeledArr);
    await this.getCoupleOfWords();
  }

  getTrueAnswer = () => {
    this.setState({
      score: this.state.score + 1,
    });
    this.nextWord();
  }

  getFalseAnswer = () => {
    this.nextWord();
  }

  getAnswerByTrueBtn = () => {
    this.state.indexTranslate
      ? this.getTrueAnswer()
      : this.getFalseAnswer();
    console.log(this.state.indexTranslate);
    console.log(this.state.currentCoupleOfWords);
  }

  getAnswerByFalseBtn = () => {
    !this.state.indexTranslate
      ? this.getTrueAnswer()
      : this.getFalseAnswer();
    console.log(this.state.indexTranslate);
    console.log(this.state.currentCoupleOfWords);
  }

  getTrueCoupleOfWords = () => {
    const lastItem = this.state.words.length - 1;
    const currentCouple = [
      this.state.words[lastItem].word,
      this.state.words[lastItem].wordTranslate,
    ];
    this.setState({
      currentCoupleOfWords: currentCouple,
    });
  }

  getFalseCoupleOfWords = () => {
    const lastItem = this.state.words.length - 2;
    const currentIndex = randomInteger(minWordIndex, lastItem);
    const currentCouple = [
      this.state.words[lastItem].word,
      this.state.words[currentIndex].wordTranslate,
    ];
    this.setState({
      currentCoupleOfWords: currentCouple,
    });
  }

  getCoupleOfWords = () => {
    this.state.indexTranslate
      ? this.getTrueCoupleOfWords()
      : this.getFalseCoupleOfWords();
  }

  handlePageChange = ({ target: { innerText } }) => {
    this.getWords(Number(innerText) - 1, this.state.activeGroup);
    this.setState({
      activePage: Number(innerText) - 1,
    });
  };

  handleGroupChange = ({ target: { innerText } }) => {
    this.getWords(this.state.activePage, Number(innerText) - 1);
    this.setState({
      activeGroup: Number(innerText) - 1,
    });
  };

  isClickHandler = () => {
    this.setState({ isStartGame: true });
  }

  getCurrentWord = () => {
    const currnetCouple = [...this.state.currentCoupleOfWords];
    return currnetCouple[0];
  }

  getCurrentWordTranslate = () => {
    const currnetCouple = [...this.state.currentCoupleOfWords];
    return currnetCouple[1];
  }

  render = () => (
    <div className="sprint__wrap">
      <Header />
      <Container className="sprint">
        <Row className="sprint__header">
          <Col className="sprint-pagination">
            <Pagination>
              {
                Array.from({ length: 6 }, (x, i) => i + 1).map((x) => (
                  <Pagination.Item
                    key={x}
                    active={x === (this.state.activeGroup + 1)}
                    onClick={this.handleGroupChange}
                  >
                    {x}
                  </Pagination.Item>
                ))
              }
            </Pagination>
          </Col>
          <Col>
            <Timer className="timer" />
          </Col>
          <div className="close-btn__wrap">
            <svg onClick={this.showEndGameModal} className="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" /></svg>
          </div>
        </Row>
        <Row>
          <SprintField
            words={this.state.words}
            getAnswerByTrueBtn={this.getAnswerByTrueBtn}
            getAnswerByFalseBtn={this.getAnswerByFalseBtn}
            getWord={this.getCurrentWord}
            getTranslate={this.getCurrentWordTranslate}
            score={this.state.score}
          />
        </Row>

      </Container>
    </div>
  )
}

export default SprintGame;
