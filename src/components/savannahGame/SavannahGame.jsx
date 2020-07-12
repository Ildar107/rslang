import React, { Component } from 'react';
import './savannah-game.scss';
import {
  Container, Row, Col, Pagination, ProgressBar,
} from 'react-bootstrap';
import ResultModal from './savannahResult/ResultModal';
import EndGameModal from '../endGameModal/endGameModal';
import Loader from '../loader/Loader';
import HelpModal from '../HelpModal/HelpModal';
import { SAVANNAH_HELP } from '../../constants/gamesHelp';
import userStatsServices from '../../services/user.statistic.services';

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
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
const minLengthArray = 11;
const quantityWords = 3;

class SavannahGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      group: 0,
      error: null,
      isLoaded: false,
      items: [],
      currentWords: [],
      currentWord: [],
      learnedWords: [],
      notLearnedWords: [],
      score: 0,
      totalScore: 0,
      animationName: '',
      modalShow: false,
      progress: 0,
      endGameModal: false,
    };
  }

  componentDidMount() {
    const page = randomInteger(minPage, maxPage);
    this.getWords(page, this.state.group);
    this.restartAnimation();
  }

  getWords(page, group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    this.setState({
      isLoaded: false,
    });
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          const res = getShuffledArr(result);
          const currentWordsArr = res.filter((item, index) => item && index <= 3);
          this.setState({
            isLoaded: true,
            items: res,
            currentWord: res[0],
            currentWords: currentWordsArr.sort(() => Math.random() - 0.5),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  restartAnimation = () => {
    const styleSheet = document.styleSheets[0];
    const animationName = `pulsing${Math.round(Math.random() * 100)}`;
    const keyframes = `@-webkit-keyframes ${animationName} {
        0% {transform: translateY(10px)}
        100% {transform: translateY(25vh)}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    this.setState({
      animationName,
    });
  }

  stopAnimation = () => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `@-webkit-keyframes ${this.state.animationName} {
        0% {transform: translateY(10px)}
        100% {transform: translateY(50vh)}
    }`;
    styleSheet.deleteRule(keyframes, styleSheet.cssRules.length);
    this.setState({
      animationName: 'xxx',
    });
  }

  resetProgress = () => {
    this.setState({
      progress: 0,
    });
  }

  resetScore = (currentScore) => {
    this.setState({
      totalScore: currentScore,
      score: 0,
    });
  }

  resetCompleteWords = () => {
    this.setState = ({
      learnedWords: [],
      notLearnedWords: [],
    });
  }

  nextLevel = async () => {
    const page = randomInteger(minPage, maxPage);
    const { score } = this.state;
    await this.sendStats();
    await this.resetCompleteWords();
    await this.resetScore(score);
    await this.showModal();
    await this.setState({
      page: this.state.page + 1,
    });
    await this.getWords(page, this.state.group);
    await this.stopAnimation();
    await this.resetProgress();
  }

  nextWords = () => {
    const itemsCopy = [...this.state.items];
    if (itemsCopy.length > minLengthArray) {
      itemsCopy.shift();
      const nextWords = getShuffledArr(itemsCopy);
      const currentWordsArr = nextWords.filter((item, index) => item && index <= quantityWords);
      this.setState({
        isLoaded: true,
        items: nextWords,
        currentWord: nextWords[0],
        currentWords: currentWordsArr.sort(() => Math.random() - 0.5),
        progress: this.state.progress + 11,
      });
      this.restartAnimation();
    } else {
      this.nextLevel();
    }
  }

  sendStats = () => {
    const stats = userStatsServices.formStatistics(
      'Savannah',
      this.state.page + 1,
      null,
      10 - this.state.notLearnedWords.length,
      this.state.notLearnedWords.length,
    );
    userStatsServices.sendStatistics(stats);
  };

  wordIsLearned = () => {
    const copyCurrentWord = this.state.currentWord;
    const arr = [...this.state.learnedWords];
    arr.push(copyCurrentWord);
    this.setState({
      learnedWords: arr,
      score: this.state.score + 1,
    });
    this.nextWords();
  }

  wordIsNotLearned = () => {
    const copyCurrentWord = this.state.currentWord;
    const arr = [...this.state.notLearnedWords];
    arr.push(copyCurrentWord);
    this.setState({
      notLearnedWords: arr,
    });
    this.nextWords();
  }

  compareWords = (e) => {
    const dataset = e.target.getAttribute('data-set');
    dataset === this.state.currentWord.word ? this.wordIsLearned() : this.wordIsNotLearned();
  };

  getCurrentWords() {
    const words = this.state.currentWords.map((item) => (
      <Col
        onClick={this.compareWords}
        data-set={item.word}
        key={item.word}
        className="word"
        sm
      >
        {item.word}
      </Col>
    ));
    return words;
  }

  animationEnd = () => {
    const copyCurrentWord = this.state.currentWord;
    const arr = [...this.state.notLearnedWords];
    arr.push(copyCurrentWord);
    this.setState({
      notLearnedWords: arr,
    });
    this.nextWords();
  }

  handleGroupChange = async ({ target: { innerText } }) => {
    if (Number(innerText)) {
      await this.setState({
        group: Number(innerText) - 1,
        score: 0,
        page: 0,
        progress: 0,
      });
      await this.getWords(this.state.page, this.state.group);
      await this.restartAnimation();
    }
  };

  onHide = (e) => {
    e.preventDefault();
    this.setState({
      modalShow: false,
    });
    this.restartAnimation();
  }

  onHideEngGame = () => {
    this.setState({
      endGameModal: false,
    });
    this.restartAnimation();
  }

  showModal = () => {
    this.setState({
      modalShow: true,
    });
  }

  showEndGameModal = () => {
    this.setState({
      endGameModal: true,
    });

    this.restartAnimation();
    this.stopAnimation();
  }

  render() {
    const style = {
      animationName: this.state.animationName,
      animationTimingFunction: 'linear',
      animationDuration: '4s',
      animationDelay: '0.0s',
      animationDirection: 'normal',
      animationFillMode: 'forwards',
      animationIterationCount: 'infinite',
    };

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
      <Container className="savannah">
        <Row className="savanna_levels">
          <Col className="levels__groups" sm>
            <p>Страница:</p>
            <Pagination className="levels__pag">
              {
              Array.from([1, 2, 3, 4, 5, 6], (x) => x).map((x) => (
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
          <Col className="savannah__score" sm>
            Угаданные слова:
            {' '}
            {this.state.score}
            /10
            <div>
              <ProgressBar animated striped variant="danger" now={this.state.progress} />
            </div>
          </Col>
          <Col className="savannah__level">
            Уровень:
            {' '}
            {this.state.page + 1}
          </Col>
          <div className="close-btn__wrap">
            <svg onClick={this.showEndGameModal} className="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" /></svg>
          </div>
        </Row>
        <div
          className="translate animation"
          data-set={this.state.currentWord.word}
          style={style}
          onAnimationIteration={this.animationEnd}
        >
          {this.state.currentWord.wordTranslate}
        </div>
        <Row className="words-block">
          {
            this.getCurrentWords()
          }
        </Row>
        <div className="savannah__help">
          <HelpModal
            messages={SAVANNAH_HELP}
          />
        </div>

        <ResultModal
          onHide={this.onHide}
          show={this.state.modalShow}
          score={this.state.totalScore}
        />
        <EndGameModal onHide={this.onHideEngGame} show={this.state.endGameModal} />
      </Container>
    );
  }
}

export default SavannahGame;
