import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import WordBuilderMain from '../../components/word-builder/word-builder-main/WordBuilderMain';

const WordBuilder = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <WordBuilderMain />
      </Row>
    </Container>
  </>
);

export default WordBuilder;
