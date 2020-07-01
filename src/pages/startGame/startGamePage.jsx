import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Skeleton from '../../components/skeleton/Skeleton';
import './startGamePage.scss';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EndGameModal from '../../components/endGameModal/endGameModal';
import routes from '../../constants/routes';

function StartGamePage() {
  const [modalShow, setModalShow] = useState(false);
  // const { game } = props;
  return (
    <Container fluid>
      <div className="start-game">
        <Button
          className="start-game-close"
          onClick={() => setModalShow(true)}
        >
          <i className="material-icons">close</i>
        </Button>
        <Link to={routes.PUZZLE}>
          <Button
            className="start-game-start-btn"
          >
            Начать игру
          </Button>
        </Link>
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
