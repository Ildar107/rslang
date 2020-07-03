import React from 'react';
import { Row, Col } from 'react-bootstrap';
import personsInfo from './person-info';
import TeamItem from './TeamItem/TeamItem';
import './team-page.scss';
import Skeleton from '../../components/skeleton/Skeleton';

const TeamPage = () => (
  <Skeleton wrapperClass="main-page">
    <h1 className="team__header">Над приложением работали:</h1>
    <Row className="team__wrap">
      {personsInfo.map((item, i) => <Col key={i}><TeamItem info={item} /></Col>)}
    </Row>
  </Skeleton>
);

export default TeamPage;
