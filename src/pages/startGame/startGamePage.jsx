import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Skeleton from '../../components/skeleton/Skeleton';
import './startGamePage.scss';
import { Button, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import EndGameModal from '../../components/endGameModal/endGameModal';
import routes from '../../constants/routes';

const description = {
  PUZZLE: {
    name: 'PUZZLE',
    info: 'Собирай предложения из слов, используй'
        + ' подсказки, сложи паззл из предложений.',
  },
  SPEAKIT: {
    name: 'SPEAK IT',
    info: 'Слушай'
        + ' слова, читай транскрипцию, добейся'
        + ' правильного произношения.',
  },
  SAVANNAH: {
    name: 'SAVANNAH',
    info: '',
  },
  AUDIOCALL: {
    name: 'AUDIOCALL',
    info: '',
  },
};

function StartGamePage() {
  const [modalShow, setModalShow] = useState(false);

  const game = qs.parse(useLocation().search).q;
  const path = routes[game];
  return (
    <Container fluid>
      <div className="start-game">
        <Button
          className="start-game-close"
          onClick={() => setModalShow(true)}
        >
          <i className="material-icons">close</i>
        </Button>
        <div className="start-game-description">
          <h2>{description[game].name}</h2>
          <p>{description[game].info}</p>
          <Link to={path}>
            <Button
              className="start-game-start-btn"
            >
              Начать игру
            </Button>
          </Link>
        </div>
        <EndGameModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>

    </Container>

  );
}

// StartGamePage.propTypes = {// game: PropTypes.string.isRequired,
// };

export default StartGamePage;
