/* eslint-disable linebreak-style */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SprintGameComponent from '../../components/sprintGame/SprintGame';

const SprintGame = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <SprintGameComponent />
      </Row>
    </Container>
  </>
);
export default SprintGame;
