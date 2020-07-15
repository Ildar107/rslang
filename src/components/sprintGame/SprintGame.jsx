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
import EndGameModal from '../endGameModal/endGameModal';
import 'react-circular-progressbar/dist/styles.css';
import HelpModal from '../HelpModal/HelpModal';
import { SPRINT_HELP } from '../../constants/gamesHelp';
import BG from '../../assets/images/bg-orange.svg';
import userStatsServices from '../../services/user.statistic.services';

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
const easyMode = 'easy';
const normalMode = 'normal';

class SprintGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      group: 0,
      score: 0,
      indexTranslate: 0,
      progress: 0,
      totalScore: 0,
      progressValue: 0,
      level: 0,
      timerCounter: 25,
      maxValueTimer: 25,
      words: [],
      learnedWords: [],
      notLearnedWords: [],
      currentCoupleOfWords: [],
      error: null,
      modalStatus: false,
      isLoaded: false,
      timer: true,
      answerFlag: false,
      animationName: '',
      endGameModal: false,
      currentMode: normalMode,
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
    if (this.state.endGameModal) {
      clearInterval(this.timerID);
    }

    if (prevState.endGameModal) {
      this.timerID = setInterval(() => {
        this.startTimer();
      }, 1000);
    }
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

  resetCompleteWords = () => {
    this.setState = ({
      learnedWords: [],
      notLearnedWords: [],
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

  sendStats = () => {
    const stats = userStatsServices.formStatistics(
      'Sprint',
      this.state.level + 1,
      null, 10 - this.state.notLearnedWords.length,
      this.state.notLearnedWords.length,
    );
    userStatsServices.sendStatistics(stats);
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
    if (this.state.currentMode === easyMode) {
      this.setState({
        timerCounter: 30,
        maxValueTimer: 30,
      });
    } else if (this.state.currentMode === normalMode) {
      this.setState({
        timerCounter: 25,
        maxValueTimer: 25,
      });
    } else {
      this.setState({
        timerCounter: 15,
        maxValueTimer: 15,
      });
    }
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
      await clearInterval(this.timerID);
      await this.nextLevel();
    }
  }

  nextLevel = async () => {
    const page = randomInteger(minPage, maxPage);
    const { score } = this.state;
    await this.sendStats();
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

  showModal = () => {
    this.setState({
      modalStatus: true,
    });
  }

  hideModal = () => {
    this.setState({
      modalStatus: false,
      learnedWords: [],
      notLearnedWords: [],
    });
    this.timerID = setInterval(() => {
      this.startTimer();
    }, 1000);
  }

  getTrueAnswer = async () => {
    const copyCurrentWord = await this.state.words[this.state.words.length - 1];
    const arr = await [...this.state.learnedWords];
    await arr.push(copyCurrentWord);
    await this.setState({
      score: this.state.score + 1,
      learnedWords: arr,
      answerFlag: true,
    });
    await this.startAnimation();
    await this.nextWord();
  }

  getFalseAnswer = async () => {
    const copyCurrentWord = await this.state.words[this.state.words.length - 1];
    const arr = await [...this.state.notLearnedWords];
    await arr.push(copyCurrentWord);
    await this.setState({
      notLearnedWords: arr,
      answerFlag: false,
    });
    await this.startAnimation();
    await this.nextWord();
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
      await this.resetScore();
      await this.setWordIndex();
      await this.setArrayOfWords(this.state.words);
      await this.getCoupleOfWords();
    }
  };

  handleChangeMode = async ({ target: { innerText } }) => {
    if (innerText) {
      await this.setState({
        currentMode: innerText,
        level: 0,
      });
      const page = await randomInteger(minPage, maxPage);
      await this.getWords(page, this.state.group);
      await this.resetProgress();
      await this.resetTimer();
      await this.resetScore();
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

  onHideEngGame = () => {
    this.setState({
      endGameModal: false,
    });
  }

  showEndGameModal = () => {
    this.setState({
      endGameModal: true,
    });
  }

  startAnimation = async () => {
    const styleSheet = await document.styleSheets[0];
    const animationName = await `pulsing${Math.round(Math.random() * 100)}`;
    await this.setState({
      animationName,
    });
    const keyframes = await this.state.answerFlag
      ? `@-webkit-keyframes ${animationName} {
      0% {border-color: rgb(84, 146, 96)}
      20% {border-color: rgb(91, 146, 101)}
      40% {border-color: rgb(100, 146, 109)}
      50% {border-color: rgb(116, 146, 116)}
      60% {border-color: rgb(127, 146, 127)}
      80% {border-color: rgb(138, 146, 138)}
      100% {border-color: rgb(147, 148, 147)}
    }`
      : `@-webkit-keyframes ${animationName} {
    0% {border-color: rgb(148, 70, 70)}
    20% {border-color: rgb(148, 79, 79)}
    40% {border-color: rgb(148, 90, 90)}
    50% {border-color: rgb(148, 95, 95)}
    60% {border-color: rgb(148, 115, 115)}
    80% {border-color: rgb(148, 138, 138)}
    100% {border-color: rgb(147, 148, 147)}
    }`;
    await styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
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

    const mode = [
      'easy',
      'normal',
      'hard',
    ];

    const stylesProgress = {
      path: {
        strokeLinecap: 'butt',
        transition: 'stroke-dashoffset 0.3s ease 0s',
      },
    };

    const styleAnimation = {
      animationName: this.state.animationName,
      animationTimingFunction: 'linear',
      animationDuration: '.6s',
      animationDelay: '0.0s',
      animationDirection: 'normal',
      animationFillMode: 'forwards',
      animationIterationCount: 1,
    };

    return (
      <div className="sprint__wrap">
        <img className="sprint_bg" src={BG} alt="Background" />
        <Container className="sprint-game">
          <Row className="sprint__header">
            <Col className="sprint-pagination" sm>
              <p>Страница:</p>
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
            <Col className="sprint-mode" sm>
              <p>Скорость:</p>
              <Pagination>
                {
                  mode.map((x) => (
                    <Pagination.Item
                      key={x}
                      active={x === (this.state.currentMode)}
                      onClick={this.handleChangeMode}
                    >
                      {x}
                    </Pagination.Item>
                  ))
                }
              </Pagination>
            </Col>
            <Col className="sprint__score" sm>
              Уровень:
              {' '}
              {this.state.level + 1}
            </Col>
            <Col className="sprint__progress" sm>
              Угадано слов:
              {' '}
              {this.state.score}
              /10
              <div style={{ marginTop: '20px' }}>
                <ProgressBar animated striped variant="danger" now={this.state.progress} />
              </div>
            </Col>
            <div className="close-btn__wrap">
              <svg onClick={this.showEndGameModal} className="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" /></svg>
            </div>
          </Row>
          <Row style={{
            justifyContent: 'center',
          }}
          >
            <div className="timer">
              <div className="timer__progress">
                <CircularProgressbar styles={stylesProgress} minValue={0} maxValue={this.state.maxValueTimer} value={this.state.timerCounter} text={`${this.state.timerCounter}`}>
                  {this.state.timerCounter}
                </CircularProgressbar>
              </div>
            </div>
          </Row>
          <Row style={{
            justifyContent: 'center',
          }}
          >
            <div className="sprint-wrap" style={styleAnimation}>
              <SprintField
                words={this.state.words}
                getAnswerByTrueBtn={this.getAnswerByTrueBtn}
                getAnswerByFalseBtn={this.getAnswerByFalseBtn}
                getWord={this.getCurrentWord}
                getTranslate={this.getCurrentWordTranslate}
                score={this.state.score}
              />
            </div>
          </Row>
          <div className="sprint__help">
            <HelpModal
              messages={SPRINT_HELP}
            />
          </div>
          <ResultModal
            show={this.state.modalStatus}
            score={this.state.totalScore}
            onHide={this.hideModal}
          />
          <EndGameModal onHide={this.onHideEngGame} show={this.state.endGameModal} />
        </Container>
      </div>
    );
  }
}

export default SprintGame;
