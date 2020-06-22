/* eslint-disable linebreak-style */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SprintStartGame from '../../components/sprintGame/SprintStartGame';

const SprintStart = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <SprintStartGame />
      </Row>
    </Container>
  </>
);
export default SprintStart;
