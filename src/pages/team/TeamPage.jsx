/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';
import personsInfo from './person-info';
import TeamItem from './TeamItem/TeamItem';

const TeamPage = () => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <span>Привет</span>
      </Row>
    </Container>
  </>
);

export default TeamPage;
