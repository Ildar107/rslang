import React from 'react';
import { Col } from 'react-bootstrap';
import Header from '../../components/header/Header';
import personsInfo from './person-info';
import TeamItem from './TeamItem/TeamItem';
import './team-page.scss';

const TeamPage = () => (
  <>
    <Header />
    <h1 className="team__header">Над приложением работали:</h1>
    <div className="team__wrap">
      {personsInfo.map((item, i) => <Col key={i}><TeamItem info={item} /></Col>)}
    </div>
  </>

);

export default TeamPage;
