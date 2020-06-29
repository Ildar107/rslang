/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SprintGameComponent from '../../components/sprintGame/SprintGame';

class SprintGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container fluid>
          <Row>
            <SprintGameComponent />
          </Row>
        </Container>
      </div>
    );
  }
}

export default SprintGame;
