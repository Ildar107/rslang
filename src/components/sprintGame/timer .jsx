/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-expressions */

import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './timer.scss';

const Timer = () => {
  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleClickModal = () => {
    const element = document.querySelector('.sprint__modal');
    element.style.display = 'block';
  };

  const handleClickModalClose = () => {
    const element = document.querySelector('.sprint__modal');
    element.style.display = 'none';
  };

  if (counter > 0) {
    return (
      <div className="App">
        <svg className="sprint__close" onClick={handleClickModal}>xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"
          <path fill="currentColor" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" />
        </svg>
        {/* <div className="statistics" style={{"display: none"}}>ffff</div> */}
        <div className="sprint__modal">
          <p>Выход из игры</p>
          <span>Статистика не будет сохранена.</span>
          <span>Уверены, что хотите завершить тренировку?</span>
          <div className="sprint__btn-wrap stat__btn-wrap">
            <a href="#/sprint-game" className="sprint-link" onClick={handleClickModalClose}>Вернуться</a>
            <a href="#/" className="sprint-link">На главную</a>
          </div>
        </div>
        <div className="progress-bar">
          <CircularProgressbar maxValue={30} value={counter} text={`${counter}`}>
            {counter}
          </CircularProgressbar>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <svg className="sprint__close" onClick={handleClickModal}>xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"
        <path fill="currentColor" d="M.974 0L0 .974 5.026 6 0 11.026.974 12 6 6.974 11.026 12l.974-.974L6.974 6 12 .974 11.026 0 6 5.026z" />
      </svg>
      <div className="statistics">
        <h2 className="statistics__title">Результаты тренировки</h2>
        <span className="statistics__points">0 очков</span>
        <div className="sprint__btn-wrap stat__btn-wrap">
          <a href="#/sprint-start" className="sprint-link">Начать заново</a>
          <a href="#/" className="sprint-link">На главную</a>
        </div>
      </div>
    </div>
  );
};

export default Timer;
