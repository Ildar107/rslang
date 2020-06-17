import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import './mainPage.scss';

const MainPage = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <span>Главная страница!</span>
      </Row>
    </Container>
  </>
);

export default MainPage;
