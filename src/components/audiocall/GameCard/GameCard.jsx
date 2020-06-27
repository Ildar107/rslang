/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Col,
  Image,
  Button,
  Row,
} from 'react-bootstrap';
import classNames from 'classnames';
import Voice from '../../../assets/images/voice.svg';
import Correct from '../../../assets/images/correct.svg';

const keyBinds = ['1', '2', '3', '4', '5'];

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: this.props.stage,
      cardNumber: this.props.cardNumber,
      isAnswer: 0,
      shuffleWords: JSON.parse(JSON.stringify(this.props.stage)).sort(() => Math.random() - 0.5),
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPressed);
  }

  next = () => {
    setTimeout(() => {
      const { stage, isAnswer, isError } = this.state;
      if (isAnswer) {
        this.props.nextCard(isAnswer && !isError);
      } else {
        this.setState({
          isAnswer: 1,
          isError: 1,
          rightWord: stage[0],
        });
      }
    }, 100);
  }

  tryGuess = (i) => {
    if (!this.state.isAnswer && !this.state.isError) {
      const { shuffleWords, stage } = this.state;

      this.setState({
        selectedWord: shuffleWords[i],
      });

      if (shuffleWords[i].word === stage[0].word) {
        this.setState({ isAnswer: 1, isError: 0, rightWord: shuffleWords[i] });
      } else {
        this.setState({ isAnswer: 1, isError: 1, rightWord: stage[0] });
      }
    }
  }

  onKeyPressed = (e) => {
    if (keyBinds.includes(e.key) && this.isActive()) {
      const i = Number(e.key) - 1;
      this.tryGuess(i);
    }
    if (e.key === 'Enter' && this.isActive()) {
      this.next();
    }
  }

  isActive = () => this.props.activeCard() === this.state.cardNumber

  render() {
    return (
      <>
        {
          this.state.isAnswer && this.isActive()
            ? (
              <Col className="right_word">
                <Image
                  src={this.state.stage[0].image}
                  roundedCircle
                  height={100}
                  width={100}
                  alt={this.state.stage[0].word}
                />
                <Col className="right_word__description">
                  <Image onClick={this.props.repeatAudio} src={Voice} alt={Voice} className="repeat_voice" />
                  <p>{this.state.stage[0].word}</p>
                </Col>
              </Col>
            )
            : (
              <Image onClick={this.props.repeatAudio} src={Voice} alt={Voice} className="repeat_voice" />
            )
        }
        <Row className="words-row">
          {
            this.state.shuffleWords.map((word, i) => (
              <Button onClick={() => this.tryGuess(i)} onKeyPress={(e) => this.onKeyPressed(e)} key={word.id} className="words">
                <p
                  className={
                    classNames({
                      'wrong-word': this.state.isError && this.isActive() && this.state.selectedWord?.word === word.word,
                      'correct-word': !this.state.isError && this.isActive() && this.state.rightWord?.word === word.word,
                      'show-correct-word': this.state.isError && this.isActive() && this.state.rightWord?.word === word.word,
                      'normal-word': this.state.isAnswer
                        && this.isActive()
                        && this.state.rightWord?.word !== word.word
                        && this.state.selectedWord?.word !== word.word,
                    })
                  }
                >
                  <Image src={Correct} alt="Correct" className="icon-correct-word" />
                  <span className="number">{i + 1}</span>
                  <span className="translate_word">{word.wordTranslate}</span>
                </p>
              </Button>
            ))
          }
        </Row>
        <Button
          onClick={(e) => { this.next(); e.target.blur(); }}
          onKeyPress={this.onKeyPressed}
          tabIndex={0}
        >
          {this.state.isAnswer && this.isActive() ? 'Далее' : 'Не знаю'}
        </Button>
      </>

    );
  }
}

export default Word;
