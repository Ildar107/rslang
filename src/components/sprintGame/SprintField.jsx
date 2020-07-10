/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import {
  Container, Button,
} from 'react-bootstrap';
// import SprintCard from './sprint-card';
import './sprint-field.scss';

class SprintField extends Component {
  constructor(props) {
    super(props);
    this.props.words;
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      window.location.href = '#/sprint-game';
    });
  }

  handleClickModal = () => {
    const element = document.querySelector('.sprint__modal');
    element.style.display = 'block';
  };

  handleClickModalClose = () => {
    const element = document.querySelector('.sprint__modal');
    element.style.display = 'none';
  };

  render() {
    return (
      <Container className="sprint">
        <div className="sprint-wrapper sprint__game-wrapper">
          <div className="sprint__card-header">
            <span className="sprint__checkpoint" />
            <span className="sprint__audio" />
          </div>
          <div className="card__content">
            <div className="card__word">{this.props.getWord()}</div>
            <div className="card__translate">{this.props.getTranslate()}</div>
          </div>
          <div className="sprint__btn-wrap">
            <Button onClick={this.props.getAnswerByFalseBtn} className="sprint__btn red">Неверно</Button>
            <Button onClick={this.props.getAnswerByTrueBtn} className="sprint__btn green">Верно</Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default SprintField;
