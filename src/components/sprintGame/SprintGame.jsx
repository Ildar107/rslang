/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Container, Row, Pagination, Col, ProgressBar,
} from 'react-bootstrap';
import SprintField from './SprintField';
import Timer from './timer ';
import './sprint-game.scss';
import ResultModal from './resultModal';
import Loader from '../loader/Loader';

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
const minLengthArray = 11;

class SprintGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      group: 0,
      words: [],
      error: null,
      activePage: 0,
      activeGroup: 0,
      score: 0,
      indexTranslate: 0,
      currentCoupleOfWords: [],
      modalStatus: false,
      propgress: 0,
      time: 25,
      isLoaded: false,
      learnedWords: [],
      notLearnedWords: [],
      progress: 0,
      totalScore: 0,
    };
  }

  componentDidMount = () => {
    const page = randomInteger(minPage, maxPage);
    this.getWords(page, this.state.group)
      .then(() => {
        this.setWordIndex();
      })
      .then(() => {
        this.getCoupleOfWords();
      });
  }

  setArrayOfWords = (arr) => {
    this.setState({
      words: arr,
    });
  }

  isLoad = () => {
    this.setState({
      isLoaded: false,
    });
  }

  loadIsDone = () => {
    this.setState({
      isLoaded: true,
    });
  }

  getWords = async (page, group) => {
    await this.isLoad();
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    const shuffeledWords = await getShuffledArr(json);
    await this.setArrayOfWords(shuffeledWords);
    await this.loadIsDone();
  };

  setWordIndex = () => {
    const currentIndexTranslate = randomInteger(falseTranslate, trueTranslate);
    this.setState({
      indexTranslate: currentIndexTranslate,
    });
  }

  resetProgress = () => {
    this.setState({
      progress: 0,
    });
  }

  updateProgress = () => {
    this.setState({
      progress: this.state.progress + 11,
    });
  }

  resetScore = (curentScore) => {
    this.setState({
      score: 0,
      totalScore: curentScore,
    });
  }

  nextWord = async () => {
    const currentWordArr = await [...this.state.words];
    console.log(currentWordArr.length);
    if (currentWordArr.length > minLengthArray) {
      await currentWordArr.pop();
      const newShuffeledArr = await getShuffledArr(currentWordArr);
      await this.setWordIndex();
      await this.setArrayOfWords(newShuffeledArr);
      await this.getCoupleOfWords();
      await this.updateProgress();
    } else {
      await this.nextLevel();
    }
  }

  nextLevel = async () => {
    const page = randomInteger(minPage, maxPage);
    const { score } = this.state;
    await this.resetScore(score);
    await this.showModal();
    await this.setState({
      page: this.state.page + 1,
    });
    await this.getWords(page, this.state.group);
    await this.resetProgress()``;
  }

  getTrueAnswer = () => {
    this.setState({
      score: this.state.score + 1,
    });
    this.nextWord();
  }

  showModal = () => {
    this.setState({
      modalStatus: true,
    });
  }

  hideModal = () => {
    this.setState({
      modalStatus: false,
    });
  }

  getFalseAnswer = () => {
    this.nextWord();
  }

  getAnswerByTrueBtn = () => {
    this.state.indexTranslate
      ? this.getTrueAnswer()
      : this.getFalseAnswer();
  }

  getAnswerByFalseBtn = () => {
    !this.state.indexTranslate
      ? this.getTrueAnswer()
      : this.getFalseAnswer();
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

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return (
        <div>
          Ошибка:
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return <Loader />;
    }

    return (
      <div className="sprint__wrap">
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
              <Timer time={this.state.time} score={this.state.score} className="timer" />
            </Col>
            <Col className="savannah__score" sm>
              Угаданные слова:
              {' '}
              {this.state.score}
              /10
              <div>
                <ProgressBar animated striped variant="danger" now={this.state.progress} />
              </div>
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
          <ResultModal
            show={this.state.modalStatus}
            score={this.state.totalScore}
            onHide={this.hideModal}
          />

        </Container>
      </div>
    );
  }
}

export default SprintGame;
