import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import 'react-circular-progressbar/dist/styles.css';
import './timer.scss';

const Timer = () => {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // const isClickHandler = () => {
  //   props.setState({ isStartGame: false });
  // };
  // onClick={isClickHandler}

  if (counter > 0) {
    return (
      <div className="App">
        <div className="progress-bar">
          <CircularProgressbar maxValue={60} value={counter} text={`${counter}`}>
            {counter}
          </CircularProgressbar>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="statistics">
        <h2 className="statistics__title">Результаты тренировки</h2>
        <span className="statistics__points">0 очков</span>
        <div className="sprint__btn-wrap stat__btn-wrap">
          {/* <a href="#/sprint-game" className="sprint-link">Начать заново</a> */}
          {/* <a href="#/" className="sprint-link">На главную</a> */}
          <Link className="sprint-link green" to={routes.SPRINTGAME}>Начать заново</Link>
          <Link className="sprint-link red" to={routes.LANDING}>На главную</Link>
        </div>
      </div>
    </div>
  );
};

export default Timer;
