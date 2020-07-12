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
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/mainpage.jpg" alt="main page" />
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="1"
              >
                <h3 className="promo__h3">{settingsDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div className="promo__body">
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/settings.jpg" alt="main page" />
                    </div>
                    <p className="promo__description_l">
                      {settingsDescription.description}
                    </p>
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
                <h3 className="promo__h3">{learnWordsDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <div className="promo__body">
                    <p className="promo__description_l">
                      {learnWordsDescription.description}
                    </p>
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/pagewithcards.jpg" alt="main page" />
                    </div>
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
                <h3 className="promo__h3">{miniGamesDescription.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <div className="promo__body">
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/Minigame.jpg" alt="main page" />
                    </div>
                    <p className="promo__description_l">
                      {miniGamesDescription.description}
                    </p>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="4"
              >
                <h3 className="promo__h3">{miniGamesDescription.AUDIO_CALL.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <div className="promo__body">
                    <p className="promo__description_l">
                      {miniGamesDescription.AUDIO_CALL.description}
                    </p>
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/audiocall.jpg" alt="main page" />
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="5"
              >
                <h3 className="promo__h3">{miniGamesDescription.ENGLISH_PUZZLE.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <div className="promo__body">
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/puzzle.jpg" alt="main page" />
                    </div>
                    <p className="promo__description_l">
                      {miniGamesDescription.ENGLISH_PUZZLE.description}
                    </p>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="6"
              >
                <h3 className="promo__h3">{miniGamesDescription.SPEAKIT.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <div className="promo__body">
                    <p className="promo__description_l">
                      {miniGamesDescription.SPEAKIT.description}
                    </p>
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/speakit.jpg" alt="main page" />
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="7"
              >
                <h3 className="promo__h3">{miniGamesDescription.SAVANNAH.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <div className="promo__body">
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/savannah.jpg" alt="main page" />
                    </div>
                    <p className="promo__description_l">
                      {miniGamesDescription.SAVANNAH.description}
                    </p>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="8"
              >
                <h3 className="promo__h3">{miniGamesDescription.SPRINT.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  <div className="promo__body">
                    <p className="promo__description_l">
                      {miniGamesDescription.SPRINT.description}
                    </p>
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/sprint.jpg" alt="main page" />
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card style={styleBorder}>
              <Accordion.Toggle
                style={styleCursor}
                as={Card.Header}
                eventKey="9"
              >
                <h3 className="promo__h3">{miniGamesDescription.WORD_BUILDER.header}</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="9">
                <Card.Body>
                  <div className="promo__body">
                    <div className="img-wrap">
                      <img className="promo__img" src="./images/promo-images/constructor.jpg" alt="main page" />
                    </div>
                    <p className="promo__description_l">
                      {miniGamesDescription.WORD_BUILDER.description}
                    </p>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

      </Skeleton>
    </div>
  );
};
export default PromoPage;
