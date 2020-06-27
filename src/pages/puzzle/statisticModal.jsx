import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <div className="modal-sentence">
          <svg
            onClick={() => audioPlay(item)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
          </svg>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
    mistakeSentenses = mistakes.map((item) => (
      <>
        <div className="modal-sentence">
          <svg
            onClick={() => audioPlay(item)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
          </svg>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
    dontKnowSentenses = dontKnow.map((item) => (
      <>
        <div className="modal-sentence">
          <svg
            onClick={() => audioPlay(item)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
          </svg>
          <p>{props.wordsData[item].textExample}</p>
        </div>
        <div className="modal-sentence-translate">
          <p>{props.wordsData[item].textExampleTranslate}</p>
        </div>
      </>
    ));
  }

  return (
    <>
      <div id="modal1" className="modal">
        <p className="modal-head">
          Составили правильно с первой попытки
          <span
            className="new badge"
            data-badge-caption=""
          >
            {right.length}
          </span>
        </p>
        <br />
        {rightSentenses}
        <div className="divider"> </div>
        <p className="modal-head">
          Составили правильно не с первой попытки
          <span
            className="new badge orange"
            data-badge-caption=""
          >
            {mistakes.length}
          </span>
        </p>
        <br />
        {mistakeSentenses}
        <div className="divider"> </div>
        <p className="modal-head">
          Не смогли составить правильно
          <span
            className="new badge red"
            data-badge-caption=""
          >
            {dontKnow.length}
          </span>
        </p>
        {dontKnowSentenses}
        <div className="divider"> </div>
        <button
          className="modal-close waves-effect waves-green btn-flat"
        >
          Close
        </button>

      </div>
    </>
  );
}

StatisticModal.propTypes = {
  next: PropTypes.bool.isRequired,
  wordsData: PropTypes.isRequired,
  arrayOfMistakes: PropTypes.isRequired,
};

export default StatisticModal;
