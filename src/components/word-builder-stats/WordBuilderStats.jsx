/* eslint-disable react/prop-types */
import React from 'react';

const WordBuilderStats = ({ wordObjects }) => (
  <div className="stats-wrapper">
    <div className="incorrect-wrapper">
      <h1>
        {`Ошибок : ${wordObjects
          .filter(({ status }) => !status).length}
              `}
      </h1>
      <ul>
        {wordObjects
          .filter(({ status }) => !status)
          .map(({ audio, word, wordTranslate }) => (
            <li key={`${word} ${wordTranslate}`}>
              <div>
                <button
                  type="button"
                  className="audio-button-stats"
                  onClick={() => new Audio(audio).play()}
                >
                  s
                </button>
                <span>
                  {word}
                  {' '}
                  -
                  {' '}
                  {wordTranslate}
                </span>
              </div>

            </li>
          ))}
      </ul>
    </div>
    <br />
    <div className="correct-wrapper">
      <h1>
        {`Правильных ответов : ${wordObjects
          .filter(({ status }) => status).length}
              `}
      </h1>
      <ul>
        {wordObjects
          .filter(({ status }) => status)
          .map(({ audio, word, wordTranslate }) => (
            <li key={`${word} ${wordTranslate}`}>
              <div>
                <button
                  type="button"
                  className="audio-button-stats"
                  onClick={() => new Audio(audio).play()}
                >
                  s
                </button>
                <span>
                  {word}
                  {' '}
                  -
                  {' '}
                  {wordTranslate}
                </span>
              </div>
            </li>
          ))}
      </ul>
      <button type="button" className="restart-button">Начать заного</button>
      <button type="button" className="return-button">Вернуться на главную страницу</button>
    </div>
  </div>
);

export default WordBuilderStats;
