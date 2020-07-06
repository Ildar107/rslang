import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import 'react-circular-progressbar/dist/styles.css';
import './timer.scss';

const Timer = () => {
  const [counter, setCounter] = React.useState(20);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // const isClickHandler = () => {
  //   props.setState({ isStartGame: false });
  // };
  // onClick={isClickHandler}

  if (counter > 0) {
    return (
      <div className="timer">
        <div className="progress-bar">
          <CircularProgressbar maxValue={20} value={counter} text={`${counter}`}>
            {counter}
          </CircularProgressbar>
        </div>
      </div>
    );
  }
  return (
  /*  <div className="timer">
      <div className="statistics">
        <h2 className="statistics__title">Результаты тренировки</h2>
        <span className="statistics__points">0 очков</span>
        <div className="sprint__btn-wrap stat__btn-wrap">
          <Link className="sprint-link green" to={routes.SPRINTGAME}>Начать заново</Link>
          <Link className="sprint-link red" to={routes.LANDING}>На главную</Link>
        </div>
      </div>
    </div> */
    <h1>Game over</h1>
  );
};

export default Timer;
