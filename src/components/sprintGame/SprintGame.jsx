/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */

import React from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import routes from '../../constants/routes';

const SprintGameComponent = () => {
  window.onload = () => {
    const loaded = sessionStorage.getItem('loaded');
    if (loaded) {
      window.location.href = '#/sprint-start';
    } else {
      sessionStorage.setItem('loaded', true);
    }
  };

  return (
    <Container className="sprint">
      <Row className="sprint-wrapper">
        <span>Something write</span>
      </Row>
    </Container>
  );
};

export default SprintGameComponent;
