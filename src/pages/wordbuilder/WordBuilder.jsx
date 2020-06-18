import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import WordBuilderGame from '../../components/word-builder/WordBuilderGame/WordBuilderGame';

const WordBuilder = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <WordBuilderGame />
      </Row>
    </Container>
  </>
);

export default WordBuilder;
