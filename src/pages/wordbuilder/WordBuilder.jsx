import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';

const WordBuilder = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <span>Конструктор слов</span>
      </Row>
    </Container>
  </>
);

export default WordBuilder;
