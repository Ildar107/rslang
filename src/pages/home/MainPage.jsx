import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card,
} from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import Tilebox from '../../components/mainPage/Tilebox';
// import WeekProgress from '../../components/mainPage/WeekProgress';
import './mainPage.scss';
import userWordsService from '../../services/user.words.services';
// import StoreContext from '../../app/store';
import USERSETTINGS from '../../constants/userSettings';

const { getUserWords } = userWordsService;

const MainPage = () => {
  // const { userSettings } = useContext(StoreContext);
  const [wordCount, setWordCount] = useState([]);
  const [prevWordsPerDay] = useState(+localStorage.getItem('prevWordsPerDay') || 0);
  const [prevCardsPerDay] = useState(+localStorage.getItem('prevCardsPerDay') || 0);
  const [prevCurrentWordIndex] = useState(+localStorage.getItem('prevCurrentWordIndex') || 0);
  const [prevLongestStreak] = useState(+localStorage.getItem('prevLongestStreak') || 0);

  useEffect(() => {
    async function fetchWords() {
      const data = await getUserWords(localStorage.getItem('JWT'), localStorage.getItem('userId'));
      setWordCount(data.length);
    }
    fetchWords();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem('userSettings')) {
      localStorage.setItem('userSettings', JSON.stringify(USERSETTINGS));
    }

    const { wordsPerDay, cardsPerDay } = localStorage.getItem('userSettings');
    // ? JSON.parse(localStorage.getItem('userSettings'))
    // : { wordsPerDay: 0, cardsPerDay: 0 };
    //  && JSON.stringify({ wordsPerDay: 0, cardsPerDay: 0 });
    const { currentWordIndex, longestStreak } = localStorage;

    return () => {
      if (
        +localStorage.getItem('prevWordsPerDay') === wordsPerDay
      || +localStorage.getItem('prevCardsPerDay') === cardsPerDay
      || +localStorage.getItem('prevCurrentWordIndex') === currentWordIndex
      || +localStorage.getItem('prevLongestStreak') === longestStreak
      ) {
        localStorage.setItem('prevWordsPerDay', wordsPerDay);
        localStorage.setItem('prevCardsPerDay', cardsPerDay);
        localStorage.setItem('prevCurrentWordIndex', currentWordIndex);
        localStorage.setItem('prevLongestStreak', longestStreak);
      }
    };
  }, []);

  const wordCountDifference = JSON.parse(localStorage.getItem('userSettings'))?.wordsPerDay - prevWordsPerDay;
  const cardCountDifference = JSON.parse(localStorage.getItem('userSettings'))?.cardsPerDay - prevCardsPerDay;
  const indexDifference = localStorage.getItem('currentWordIndex') - prevCurrentWordIndex;
  const longestStreakDifference = localStorage.getItem('longestStreak') - prevLongestStreak;

  return (
    <Skeleton wrapperClass="main-page" title="Главная">
      <Row>
        <Col lg={6}>
          <Tilebox
            title="Новые слова"
            value={JSON.parse(localStorage.getItem('userSettings'))?.wordsPerDay || 0}
            updateValue={wordCountDifference || 0}
            isUp={wordCountDifference >= 0}
            icon="uil-search"
          />
        </Col>
        <Col lg={6}>
          <Tilebox
            title="Слова для практики"
            value={JSON.parse(localStorage.getItem('userSettings'))?.cardsPerDay || 0}
            updateValue={cardCountDifference || 0}
            isUp={cardCountDifference >= 0}
            icon="uil-history-alt"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Tilebox
            title="Пройдено слов по практике"
            value={localStorage.getItem('currentWordIndex') ? localStorage.getItem('currentWordIndex') : 0}
            updateValue={indexDifference}
            isUp={indexDifference >= 0}
            icon="uil-top-arrow-to-top"
          />
        </Col>
        <Col lg={6}>
          <Tilebox
            title="Лучшая серия"
            value={+localStorage.getItem('longestStreak') ? +localStorage.getItem('longestStreak') + 1 : 0}
            updateValue={longestStreakDifference ? longestStreakDifference + 1 : 0}
            isUp={longestStreakDifference >= 0}
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
                  {`${wordCount} / 3600`}
                </span>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${wordCount / 36}%` }}
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
};
export default MainPage;
