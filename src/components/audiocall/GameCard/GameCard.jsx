/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Col,
  Image,
  Button,
  Row,
} from 'react-bootstrap';
import Voice from '../../../assets/images/voice.svg';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: this.props.stage,
      isRight: 0,
    };
  }

  next = () => {
    if (this.state.isRight) {
      this.props.nextCard();
    } else {
      this.setState({ isRight: 1 });
    }
  }

  render() {
    return (
      <>
        {
          this.state.isRight
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
                  <Image src={Voice} alt={Voice} className="repeat_voice" />
                  <p>{this.state.stage[0].word}</p>
                </Col>
              </Col>
            )
            : (
              <Image src={Voice} alt={Voice} className="repeat_voice" />
            )
        }
        <Row>
          {
            this.state.stage.map((word, i) => (
              <Col key={word.id} className="words">
                <p>
                  <span>{i + 1}</span>
                  <span>{word.wordTranslate}</span>
                </p>
              </Col>
            ))
          }
        </Row>
        <Button onClick={this.next}>
          {this.state.isRight ? 'Далее' : 'Не знаю'}
        </Button>
      </>

    );
  }
}

export default Word;
