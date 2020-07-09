/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Container, Row, Pagination, Col, ProgressBar,
} from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import SprintField from './SprintField';
import './sprint-game.scss';
import ResultModal from './resultModal';
import Loader from '../loader/Loader';
import 'react-circular-progressbar/dist/styles.css';

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
      isLoaded: false,
      learnedWords: [],
      notLearnedWords: [],
      progress: 0,
      totalScore: 0,
      progressValue: 0,
      timer: true,
      timerCounter: 25,
      timerID: null,
      level: 0,
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
    this.timerID = setInterval(() => {
      this.startTimer();
    }, 1000);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.timerCounter === 1) {
      clearInterval(this.timerID);
      this.nextLevel();
    }
  }

  restartTimer = () => {
    this.setState;
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
      progressValue: 0,
      progress: 0,
    });
  }

  updateProgress = () => {
    this.setState({
      progress: this.state.progress + 11,
      progressValue: this.state.progressValue + 1,
    });
  }

  resetScore = (curentScore) => {
    this.setState({
      score: 0,
      totalScore: curentScore,
    });
  }

  startTimer = () => {
    this.setState({
      timerCounter: this.state.timerCounter - 1,
    });
  }

  resetTimer = () => {
    this.setState({
      timerCounter: 25,
    });
  }

  nextLeveNumber = () => {
    this.setState({
      level: this.state.level + 1,
    });
  }

  nextWord = async () => {
    const currentWordArr = await [...this.state.words];
    if (currentWordArr.length > minLengthArray) {
      await currentWordArr.pop();
      const newShuffeledArr = await getShuffledArr(currentWordArr);
      await this.setWordIndex();
      await this.setArrayOfWords(newShuffeledArr);
      await this.getCoupleOfWords();
      await this.updateProgress();
    } else {
      clearInterval(this.timerID);
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
    await this.resetProgress();
    await this.resetTimer();
    await this.nextLeveNumber();
    await this.setWordIndex();
    await this.setArrayOfWords(this.state.words);
    await this.getCoupleOfWords();
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
    this.timerID = setInterval(() => {
      this.startTimer();
    }, 1000);
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

  handleGroupChange = async ({ target: { innerText } }) => {
    if (Number(innerText)) {
      await this.setState({
        group: Number(innerText) - 1,
        level: 0,
      });
      const page = await randomInteger(minPage, maxPage);
      await this.getWords(page, this.state.group);
      await this.resetProgress();
      await this.resetTimer();
      await this.setWordIndex();
      await this.setArrayOfWords(this.state.words);
      await this.getCoupleOfWords();
    }
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

    const stylesProgress = {
      path: {
        strokeLinecap: 'butt',
        transition: 'stroke-dashoffset 0.3s ease 0s',
      },
    };

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
                    active={x === (this.state.group + 1)}
                    onClick={this.handleGroupChange}
                  >
                    {x}
                  </Pagination.Item>
                ))
              }
              </Pagination>
            </Col>
            <Col className="sprint__score">
              Уровень:
              {' '}
              {this.state.level + 1}
            </Col>
            <Col className="sprint__progress" sm>
              Осталось:
              {' '}
              {this.state.progressValue}
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
            <div className="timer">
              <div className="timer__progress">
                <CircularProgressbar styles={stylesProgress} minValue={0} maxValue={25} value={this.state.timerCounter} text={`${this.state.timerCounter}`}>
                  {this.state.timerCounter}
                </CircularProgressbar>
              </div>
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
