import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SavannahGame from '../../components/savannahGame/SavannahGame';

const Savannah = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <SavannahGame />
      </Row>
    </Container>
  </>
);
export default Savannah;
