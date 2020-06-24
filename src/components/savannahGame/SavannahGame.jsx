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
  Container, Row, Col, Spinner, Pagination, Form, Button,
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
      learnedWordsArr: [],
      score: 0,
      animationName: '',
      modalShow: false,
    };
  }

  componentDidMount() {
    this.getWords(this.state.page, this.state.group);
    this.restartAnimation();
  }

  getWords(page, group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
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

  active

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
      });
    } else {
      this.showModal();
      this.nextLevel();
    }
  }

  wordIsLearned = () => {
    const copyCurrentWord = this.state.currentWord;
    const arr = [...this.state.learnedWordsArr];
    arr.push(copyCurrentWord);
    this.setState({
      learnedWordsArr: arr,
      score: this.state.score + 1,
    });
    this.nextWords();
    this.restartAnimation();
  }

  compareWords = (e) => {
    const dataset = e.target.getAttribute('data-set');
    dataset === this.state.currentWord.word ? this.wordIsLearned() : console.log('no');
  };

  getCurrentWords() {
    const words = this.state.currentWords.map((item) => <Col onClick={this.compareWords} data-set={item.word} key={item.word} className="word" sm>{item.word}</Col>);
    return words;
  }

  animationEnd = () => {
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
      group: this.state.group + 1,
    });
  }

  onHide = (e) => {
    e.preventDefault();
    this.setState({
      modalShow: false,
      score: 0,
    });
    this.getWords(this.state.page, this.state.group);
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
            <Form className="savannah__select">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Level:</Form.Label>
                <Form.Control as="select" onChange={this.handlePageChange}>
                  {
                  Array.from({ length: 30 }, (x, i) => i).map((x) => (
                    <option
                      key={x}
                      active={x === (this.state.group)}
                    >
                      {x}
                    </option>
                  ))
                }
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col sm>
            Score:
            {' '}
            {this.state.score}
            /10
          </Col>
          <Col>
            Уровень:
            {' '}
            {this.state.group}
          </Col>
        </Row>
        <div className="translate animation" data-set={this.state.currentWord.word} style={style} onAnimationIteration={this.animationEnd}>{this.state.currentWord.wordTranslate}</div>
        <Row className="words-block">
          {
            this.getCurrentWords()
          }
        </Row>
        <ModalWindow onHide={this.onHide} show={this.state.modalShow} score={this.state.score} restartAnimation={this.restartAnimation} />
      </Container>
    );
  }
}

export default SavannahGame;
