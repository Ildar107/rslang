/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */

import React from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
// import routes from '../../constants/routes';
// import { LinkContainer } from 'react-router-bootstrap';
// import routes from '../../constants/routes';
import './sprintGame.scss';

const SprintStartGame = () => {
  return (
    <Container className="sprint">
      <Row className="sprint-wrapper">
        {/* <a href={routes.SPRINTGAME} className="sprint-link">Start Game</a> */}
        <a href="#/sprint-game" className="sprint-link">Start Game</a>
      </Row>
    </Container>
  );
};

export default SprintStartGame;
