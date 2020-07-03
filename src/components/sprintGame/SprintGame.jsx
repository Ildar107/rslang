/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Timer from './timer ';
// import SprintCard from './sprint-card';
import './sprintGame.scss';

class SprintGameComponent extends Component {
  constructor(props) {
    super(props);
    this.props.words;
    console.log('this.props.words;: ', this.props.words);
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
        <div className="sprint__timer">
          <Timer />
          <svg className="sprint__close" onClick={this.handleClickModal}>
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"
            <path className="sprint__close-color" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" />
          </svg>
          <div className="sprint__modal">
            <p className="sprint__modal-title">Выход из игры</p>
            <p>Статистика не будет сохранена. Уверены, что хотите завершить тренировку?</p>
            <div className="sprint__btn-wrap stat__btn-wrap">
              <span className="sprint-link green" onClick={this.handleClickModalClose}>Вернуться</span>
              <Link className="sprint-link red" to={routes.LANDING}>На главную</Link>
            </div>
          </div>
        </div>
        <span className="sprint__point">Points: 0</span>
        <div className="sprint-wrapper sprint__game-wrapper">
          <div className="sprint__card-header">
            <span className="sprint__checkpoint" />
            <span className="sprint__audio" />
          </div>
          <div className="card__content">
            <div className="sprint__doubling">х1</div>
            <div className="card__word">Слово</div>
            <div className="card__translate">Перевод</div>
          </div>
          <div className="sprint__btn-wrap">
            <div className="wrapper">
              <span className="sprint__btn red" type="button">Неверно</span>
              <i className="fas fa-long-arrow-alt-left" />
            </div>
            <div className="wrapper">
              <span className="sprint__btn green" type="button">Верно</span>
              <i className="fas fa-long-arrow-alt-right" />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SprintGameComponent;
