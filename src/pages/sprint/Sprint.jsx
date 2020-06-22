/* eslint-disable linebreak-style */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SprintGame from '../../components/sprintGame/SprintGame';
import './sprintGame.scss';

const Sprint = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <SprintGame />
      </Row>
    </Container>
  </>
);
export default Sprint;
