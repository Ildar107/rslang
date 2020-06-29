/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';

import Timer from './timer ';
import SprintCard from './sprint-card';

class SprintGameComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    window.addEventListener('load', () => {
      window.location.href = '#/sprint-start';
    });
  }

  render() {
    return (
      <Container className="sprint">
        <div className="sprint__timer">
          <Timer />
        </div>
        <span className="sprint__point">Points: 0</span>
        <div className="sprint-wrapper sprint__game-wrapper">
          <div className="sprint__card-header">
            <span className="sprint__checkpoint" />
            <span className="sprint__audio" />
          </div>
          <SprintCard />
          <div className="sprint__btn-wrap">
            <div className="wrapper">
              <button className="sprint__btn red" type="button">Неверно</button>
              <i className="fas fa-long-arrow-alt-left" />
            </div>
            <div className="wrapper">
              <button className="sprint__btn green" type="button">Верно</button>
              <i className="fas fa-long-arrow-alt-right" />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SprintGameComponent;
