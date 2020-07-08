import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import ResultModal from './resultModal';
import 'react-circular-progressbar/dist/styles.css';
import './timer.scss';

const Timer = (props) => {
  const [counter, setCounter] = React.useState(30);
  const [timer, setTimer] = React.useState(true);
  const [modal, setStatusModal] = React.useState(true);

  React.useEffect(() => {
    counter > 0 && timer && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleClose = () => setStatusModal(false);
  const handleShow = () => setStatusModal(true);

  if (counter > 0) {
    return (
      <div className="timer">
        <div className="timer__progress">
          <CircularProgressbar maxValue={30} value={counter} text={`${counter}`}>
            {counter}
          </CircularProgressbar>
        </div>
      </div>
    );
  }
  return (
    <>
      <ResultModal score={props.score} show={modal} handleClose={handleClose} />
    </>
  );
};

export default Timer;
