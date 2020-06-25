/* eslint-disable no-void */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import './savannah-game.scss';
import {
  Container, Row, Col, Spinner, Pagination, ProgressBar,
} from 'react-bootstrap';
import ModalWindow from './modal/Modal';

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

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
    };
  }

  componentDidMount() {
    this.getWords(this.state.page, this.state.group);
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
          console.log(this.state);
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
        100% {transform: translateY(50vh)}
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

  nextWords = () => {
    const itemsCopy = [...this.state.items];
    if (itemsCopy.length > 11) {
      itemsCopy.shift();
      const nextWords = getShuffledArr(itemsCopy);
      const currentWordsArr = nextWords.filter((item, index) => item && index <= 3);
      this.setState({
        isLoaded: true,
        items: nextWords,
        currentWord: nextWords[0],
        currentWords: currentWordsArr.sort(() => Math.random() - 0.5),
        progress: this.state.progress + 11,
      });
      this.restartAnimation();
    } else {
      const { score } = this.state;
      this.resetScore(score);
      this.showModal();
      this.nextLevel();
      this.getWords(this.state.page, this.state.group);
      this.stopAnimation();
      this.resetProgress();
    }
  }

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
    const words = this.state.currentWords.map((item) => <Col onClick={this.compareWords} data-set={item.word} key={item.word} className="word" sm>{item.word}</Col>);
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
    this.setState({
      group: Number(innerText),
    });
  };

  handlePageChange = async (e) => {
    this.setState({
      page: +e.target.value,
    });
  };

  nextLevel = () => {
    this.setState({
      page: this.state.page + 1,
    });
  }

  onHide = (e) => {
    e.preventDefault();
    this.setState({
      modalShow: false,
    });
    this.restartAnimation();
  }

  showModal = () => {
    this.setState({
      modalShow: true,
    });
  }

  render() {
    const style = {
      animationName: this.state.animationName,
      animationTimingFunction: 'linear',
      animationDuration: '5s',
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
      return <div><Spinner animation="grow" /></div>;
    }
    return (
      <Container className="savannah">
        <Row className="savanna_levels">
          <Col className="levels__groups" sm>
            <p>Page:</p>
            <Pagination className="levels__pag">
              {
              Array.from({ length: 6 }, (x, i) => i).map((x) => (
                <Pagination.Item
                  key={x}
                  active={x === (this.state.group)}
                  onClick={this.handleGroupChange}
                >
                  {x}
                </Pagination.Item>
              ))
            }
            </Pagination>
          </Col>
          <Col sm>
            Score:
            {' '}
            {this.state.score}
            /10
            <div>
              <ProgressBar variant="danger" now={this.state.progress} />
            </div>
          </Col>
          <Col>
            Уровень:
            {' '}
            {this.state.page}
          </Col>
        </Row>
        <div className="translate animation" data-set={this.state.currentWord.word} style={style} onAnimationIteration={this.animationEnd}>{this.state.currentWord.wordTranslate}</div>
        <Row className="words-block">
          {
            this.getCurrentWords()
          }
        </Row>
        <ModalWindow onHide={this.onHide} show={this.state.modalShow} score={this.state.totalScore} restartAnimation={this.restartAnimation} />
      </Container>
    );
  }
}

export default SavannahGame;
