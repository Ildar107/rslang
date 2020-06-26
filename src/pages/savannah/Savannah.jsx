import React from 'react';
import { Container } from 'react-bootstrap';
import SavannahGame from '../../components/savannahGame/SavannahGame';
import './savannah.scss';

const Savannah = () => (
  <>
    <Container className="savannah_container" fluid>
      <SavannahGame />
    </Container>
  </>
);
export default Savannah;
