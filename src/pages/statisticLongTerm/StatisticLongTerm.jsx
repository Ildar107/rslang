import React from 'react';
import { Line } from 'react-chartjs-2';
import Skeleton from '../../components/skeleton/Skeleton';

const testDATA = [
  { date: '1/6/2020', words: 6 },
  { date: '2/6/2020', words: 3 },
  { date: '3/6/2020', words: 1 },
  { date: '4/6/2020', words: 16 },
  { date: '5/6/2020', words: 10 },
  { date: '6/6/2020', words: 8 },
  { date: '7/6/2020', words: 3 },
  { date: '8/6/2020', words: 12 },
  { date: '9/6/2020', words: 14 },
  { date: '10/6/2020', words: 16 },
  { date: '11/6/2020', words: 5 },
];

const data = {
  labels: testDATA.map((item) => item.date),
  datasets: [
    {
      label: 'Количество изученных слов по датам.',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: testDATA.map((item) => item.words),
    },
  ],
};

function StatisticLongTerm() {
  return (
    <Skeleton wrapperClass="statistic-long-term-page" title="Статистика">
      <Line data={data} />
    </Skeleton>
  );
}

export default StatisticLongTerm;
