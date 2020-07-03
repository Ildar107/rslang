import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Badge } from 'react-bootstrap';

function StatisticModal(props) {
  const right = [];
  let mistakes = [];
  let dontKnow = [];
  let rightSentenses = [];
  let mistakeSentenses = [];
  let dontKnowSentenses = [];
  const [playingAudio, setPlayingAudio] = useState(null);

  function audioPlay(numOfSentence) {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    const [, fileName] = props.wordsData[numOfSentence].audioExample.split('/');
    const audio = new Audio(`https://raw.githubusercontent.com/evshipilo/rslang-data/master/data/${fileName}`);
    setPlayingAudio(audio);
    audio.play();
  }

  if (props.next) {
    mistakes = props.arrayOfMistakes.filter((it) => it < 100);
    dontKnow = props.arrayOfMistakes.filter((it) => it >= 100).map((el) => el - 100);
    const bad = mistakes.concat(dontKnow);
    let k = false;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < bad.length; j += 1) {
        if (i === bad[j]) k = true;
      }
      if (!k) right.push(i);
      k = false;
    }

    rightSentenses = right.map((item) => (
      <>
        <div className="puzzle-modal-sentence">
          <i
            onClick={() => audioPlay(item)}
            className="material-icons puzzle-modal-green "
          >
            volume_up
          </i>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="puzzle-modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
    mistakeSentenses = mistakes.map((item) => (
      <>
        <div className="puzzle-modal-sentence">
          <i
            onClick={() => audioPlay(item)}
            className="material-icons puzzle-modal-yellow"
          >
            volume_up
          </i>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="puzzle-modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
    dontKnowSentenses = dontKnow.map((item) => (
      <>
        <div className="puzzle-modal-sentence">
          <i
            onClick={() => audioPlay(item)}
            className="material-icons puzzle-modal-red"
          >
            volume_up
          </i>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="puzzle-modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5>
          Составили правильно с первой попытки:&nbsp;
          <Badge variant="success">{right.length}</Badge>
        </h5>
        {rightSentenses}
      </Modal.Body>
      <Modal.Body>
        <h5>
          Составили правильно не с первой попытки:&nbsp;
          <Badge variant="warning">{mistakes.length}</Badge>
        </h5>
        {mistakeSentenses}
      </Modal.Body>
      <Modal.Body>
        <h5>
          Не смогли составить правильно:&nbsp;
          <Badge variant="danger">{dontKnow.length}</Badge>
        </h5>
        {dontKnowSentenses}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => props.onHide(false)}
        >
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

StatisticModal.propTypes = {
  next: PropTypes.bool.isRequired,
  wordsData: PropTypes.PropTypes.arrayOf(PropTypes.any),
  arrayOfMistakes: PropTypes.PropTypes.arrayOf(PropTypes.any),
};

StatisticModal.defaultProps = {
  wordsData: null,
  arrayOfMistakes: null,
};

export default StatisticModal;
