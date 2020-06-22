import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import WordBuilderMainPage from '../../components/word-builder/word-builder-main/WordBuilderMainPage';

const WordBuilder = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <WordBuilderMainPage />
      </Row>
    </Container>
  </>
);

export default WordBuilder;
