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
  Container, Row, Col, Spinner, Pagination,
} from 'react-bootstrap';

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
    };
  }

  componentDidMount() {
    this.getWords(this.state.page, this.state.group);
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

  nextWords = () => {
    const itemsCopy = [...this.state.items];
    if (itemsCopy.length > 9) {
      itemsCopy.shift();
      const nextWords = getShuffledArr(itemsCopy);
      const currentWordsArr = nextWords.filter((item, index) => item && index <= 3);
      this.setState({
        isLoaded: true,
        items: nextWords,
        currentWord: nextWords[0],
        currentWords: currentWordsArr.sort(() => Math.random() - 0.5),
      });
    }
  }

  restartAnimation = () => {
    const elem = document.querySelector('.translate');
    elem.classList.remove('animation');
    void elem.offsetHeight;
    elem.classList.add('animation');
  }

  wordIsLearned = () => {
    const copyCurrentWord = this.state.currentWord;
    const arr = [...this.state.learnedWordsArr];
    arr.push(copyCurrentWord);
    this.setState({
      learnedWordsArr: arr,
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
      group: Number(innerText) - 1,
    });
  };

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
      return <div><Spinner animation="grow" /></div>;
    }
    return (
      <Container className="savannah">
        <div className="savannah_pag">
          <Pagination className="pag__group">
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
        </div>
        <Row className="savannah__translate">
          <Col className="translate animation" data-set={this.state.currentWord.word} onAnimationIteration={this.animationEnd} sm>{this.state.currentWord.wordTranslate}</Col>
        </Row>
        <Row className="words-block">
          {
            this.getCurrentWords()
          }
        </Row>
      </Container>
    );
  }
}

export default SavannahGame;
