import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/header/Header';
import personsInfo from './person-info';
import TeamItem from './TeamItem/TeamItem';
import './team-page.scss';

const TeamPage = () => (
  <>
    <Header />
    <Container className="team" fluid>
      <Row className="team__wrap" xs={1} md={2} lg={3}>
        {personsInfo.map((item, i) => <Col key={i}><TeamItem info={item} /></Col>)}
      </Row>
    </Container>
  </>

);

export default TeamPage;
