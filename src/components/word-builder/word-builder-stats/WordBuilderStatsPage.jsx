/* eslint-disable react/prop-types */
import React from 'react';

const WordBuilderStatsPage = ({ wordObjects }) => (
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
          .map(({
            audio, word, wordTranslate, transcription,
          }) => (
            <li key={`${word} ${wordTranslate}`} className="stats-list">
              <div>
                <button
                  type="button"
                  className="audio-button-stats btn btn-primary"
                  onClick={() => new Audio(audio).play()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
                  </svg>
                </button>
                <span>
                  {word}
                  {' '}
                  {transcription}
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
          .map(({
            audio, word, wordTranslate, transcription,
          }) => (
            <li key={`${word} ${wordTranslate}`} className="stats-list">
              <div>
                <button
                  type="button"
                  className="audio-button-stats btn btn-primary"
                  onClick={() => new Audio(audio).play()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
                  </svg>
                </button>
                <span>
                  {word}
                  {' '}
                  {transcription}
                  {' '}
                  -
                  {' '}
                  {wordTranslate}
                </span>
              </div>
            </li>
          ))}
      </ul>
      <button type="button" className="restart-button btn btn-secondary">Начать заного</button>
      <button type="button" className="return-button btn btn-secondary">Вернуться на главную страницу</button>
    </div>
  </div>
);

export default WordBuilderStatsPage;
