import React from 'react';
import './promo-page.scss';
import { Container, Row } from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import {
  miniGamesDescription,
  appDescription,
  settingsDescription,
  learnWordsDescription,
  statisticPageDescription,
} from './promo-data';

const PromoPage = () => (
  <Skeleton wrapperClass="main-page">
    <Container className="promo" fluid>
      <h1 className="team__header">Описание приложения</h1>

      <Row className="promo__description">
        <h2>{appDescription.header}</h2>
      </Row>
      <Row className="promo__description">
        <h2>{appDescription.description}</h2>
      </Row>

      <Row>
        <h2>{learnWordsDescription.header}</h2>
      </Row>
      <Row>
        <h2>{learnWordsDescription.description}</h2>
      </Row>

      <Row>
        <h2>{settingsDescription.header}</h2>
      </Row>
      <Row>
        <h2>{settingsDescription.description}</h2>
      </Row>

      <Row>
        <h2>{miniGamesDescription.header}</h2>
      </Row>
      <Row>
        <h2>{miniGamesDescription.description}</h2>
      </Row>

      <Row>
        <h2>{statisticPageDescription.header}</h2>
      </Row>
      <Row>
        <h2>{statisticPageDescription.description}</h2>
      </Row>
    </Container>

  </Skeleton>
);
export default PromoPage;
