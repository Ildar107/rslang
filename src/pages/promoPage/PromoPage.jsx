import React from 'react';
import './promo-page.scss';
import {
  Container, Row, Accordion, Card,
} from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import {
  miniGamesDescription,
  appDescription,
  settingsDescription,
  learnWordsDescription,
  statisticPageDescription,
  mainDescription,
} from './promo-data';

const PromoPage = () => {
  const styleBorder = {
    border: '1px solid #d1d1d1',
  };

  const styleCursor = {
    cursor: 'pointer',
  };

  return (
    <div>
      <Skeleton wrapperClass="main-page">
        <Container className="promo" fluid>
          <h1 className="team__header">Описание приложения</h1>

          <Row>
            <h2>{appDescription.header}</h2>
          </Row>
          <Row>
            <p className="promo__description">{appDescription.description}</p>
          </Row>

          <Accordion>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="0"
              >
                <h3 className="promo__h3">{mainDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="promo__body">
                    <p className="promo__description_l">
                      {mainDescription.description}
                    </p>
                    <img className="promo__img" src="./images/promo-images/mainpage.jpg" alt="main page" />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="2"
              >
                <h3 className="promo__h3">{mainDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <div className="promo__body">
                    <p>
                      {mainDescription.description}
                    </p>
                    <img className="promo__img" src="./images/promo-images/mainpage.jpg" alt="main page" />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="3"
              >
                <h3 className="promo__h3">{mainDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <div className="promo__body">
                    <p>
                      {mainDescription.description}
                    </p>
                    <img className="promo__img" src="./images/promo-images/mainpage.jpg" alt="main page" />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Click me!
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

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
    </div>
  );
};
export default PromoPage;
