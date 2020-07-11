import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row } from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import './statisticLongTerm.scss';
import userWordsService from '../../services/user.words.services';

const { getUserWords } = userWordsService;

const StatisticLongTerm = () => {
  // const [userWordDates, setUserWordDates] = useState([]);
  const [realData, setRealData] = useState([]);

  useEffect(() => {
    async function fetchUserWords() {
      const { userId, JWT: jwt } = localStorage;
      const data = await getUserWords(jwt, userId);
      const dates = data.map(({ optional }) => optional?.todayDate).filter((date) => date);
      const uniqueDates = [...new Set(dates)];
      uniqueDates.sort((date1, date2) => {
        const res = new Date(date1) - new Date(date2);
        // console.log(res);
        return res;
      });
      const dataObjects = [];
      uniqueDates.forEach((uniqueDate) => {
        const words = dates.filter((date) => date === uniqueDate).length;
        dataObjects.push({ date: uniqueDate, words });
        // console.log(words);
      });
      // dates = dates.filter((date) => date);
      // console.log(uniqueDates);
      // console.log(dates);
      console.log(dataObjects);
      setRealData(dataObjects);
      // setUserWordDates(dates);
    }
    fetchUserWords();
  }, []);

  // const testDATA = [
  //   { date: '1/6/2020', words: 6 },
  //   { date: '2/6/2020', words: 3 },
  //   { date: '3/6/2020', words: 1 },
  //   { date: '4/6/2020', words: 16 },
  //   { date: '5/6/2020', words: 10 },
  //   { date: '6/6/2020', words: 8 },
  //   { date: '7/6/2020', words: 3 },
  //   { date: '8/6/2020', words: 12 },
  //   { date: '9/6/2020', words: 14 },
  //   { date: '10/6/2020', words: 16 },
  //   { date: '11/6/2020', words: 5 },
  // ];

  const dates = realData.map((item) => item.date);
  const numOfWords = realData.map((item) => item.words);
  const sumOfWords = [];
  numOfWords.reduce((acc, item) => {
    sumOfWords.push(acc + item);
    return (acc + item);
  }, 0);
  const left = sumOfWords.map((it) => 3600 - it);
  const percent = sumOfWords.map((it) => ((100 * it) / 3600).toFixed(1));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Количество изученных слов.',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(37,95,82,0.47)',
        borderColor: 'rgba(37,95,82,0.47)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(236,9,9)',
        pointHoverBorderColor: 'rgb(236,9,9)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: numOfWords,
      },
    ],
  };

  const data1 = {
    labels: dates,
    datasets: [
      {
        label: 'Общее количество изученных слов.',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(37,70,95,0.47)',
        borderColor: 'rgba(37,70,95,0.47)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(236,9,9)',
        pointHoverBorderColor: 'rgb(236,9,9)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: sumOfWords,
      },
    ],
  };

  const data2 = {
    labels: dates,
    datasets: [
      {
        label: 'Процент изученных слов.',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(71,37,95,0.47)',
        borderColor: 'rgba(71,37,95,0.47)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(236,9,9)',
        pointHoverBorderColor: 'rgb(236,9,9)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: percent,
      },
    ],
  };

  const data3 = {
    labels: dates,
    datasets: [
      {
        label: 'Осталось изучить.',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(84,95,37,0.47)',
        borderColor: 'rgba(84,95,37,0.47)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(236,9,9)',
        pointHoverBorderColor: 'rgb(236,9,9)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: left,
      },
    ],
  };

  // const { userId, JWT: jwt } = localStorage;
  // const userWords = getUserWords(jwt, userId).then((res) => console.log(res));
  // console.log(userWords);

  return (
    <Skeleton wrapperClass="statistic-long-term-page" title="Статистика">
      <Row>
        <Col lg={6}>
          <div className="statistic-long-term">
            <Line key="num" data={data} />
          </div>
        </Col>
        <Col lg={6}>
          <div className="statistic-long-term">
            <Line key="sum" data={data1} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <div className="statistic-long-term">
            <Line key="prec" data={data2} />
          </div>
        </Col>
        <Col lg={6}>
          <div className="statistic-long-term">
            <Line key="left" data={data3} />
          </div>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default StatisticLongTerm;
