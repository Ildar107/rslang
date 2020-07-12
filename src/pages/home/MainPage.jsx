import React from 'react';
import {
  Row, Col, Card,
} from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import Tilebox from '../../components/mainPage/Tilebox';
import WeekProgress from '../../components/mainPage/WeekProgress';
import './mainPage.scss';

const MainPage = () => (
  <Skeleton wrapperClass="main-page" title="Главная">
    <Row>
      <Col lg={6}>
        <Tilebox
          title="Новые слова"
          value={JSON.parse(localStorage.getItem('userSettings')).wordsPerDay}
          updateValue="+50"
          isUp
          icon="uil-search"
        />
      </Col>
      <Col lg={6}>
        <Tilebox
          title="Слова для практики"
          value={JSON.parse(localStorage.getItem('userSettings')).cardsPerDay}
          updateValue="+20"
          isUp
          icon="uil-history-alt"
        />
      </Col>
    </Row>
    <Row>
      <Col lg={6}>
        <Tilebox
          title="Пройдено слов по практике"
          value={localStorage.getItem('currentWordIndex') ? localStorage.getItem('currentWordIndex') : 0}
          updateValue="+20"
          isUp
          icon="uil-top-arrow-to-top"
        />
      </Col>
      <Col lg={6}>
        <Tilebox
          title="Лучшая серия"
          value={+localStorage.getItem('longestStreak') ? +localStorage.getItem('longestStreak') + 1 : 0}
          updateValue="-2"
          icon="uil-medal"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h3>
              Общий Прогресс
            </h3>
            <div className="progress-container">
              <span>
                Score
                {' '}
                {`${localStorage.getItem('currentWordIndex')} / 3600`}
              </span>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${+localStorage.getItem('currentWordIndex') / 36}%` }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
            {/* <WeekProgress day="Понедельник" value={30} />
            <WeekProgress day="Вторник" value={100} />
            <WeekProgress day="Среда" value={60} />
            <WeekProgress day="Четверг" value={90} />
            <WeekProgress day="Пятница" value={20} />
            <WeekProgress day="Суббота" value={100} />
            <WeekProgress day="Воскресенье" value={100} /> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Skeleton>
);
export default MainPage;
