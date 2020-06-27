import React from 'react';
import {
  Button,
  Modal,
  Row,
  Image,
  Nav,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Voice from '../../../../assets/images/voice.svg';
import routes from '../../../../constants/routes';

const StatsModal = (props) => {
  const {
    score, guessedWords, round, showStats,
  } = props.stats;

  const { closeModalStats, restartRound, nextRound } = props;

  const NavLink = (link, text) => (
    <LinkContainer to={link} exact>
      <Nav.Link eventKey={link}>{text}</Nav.Link>
    </LinkContainer>
  );

  const restart = () => {
    closeModalStats();
    restartRound();
  };

  const next = () => {
    closeModalStats();
    nextRound();
  };

  const repeatAudio = (audio) => (new Audio(audio)).play();

  return (
    <>
      <Modal
        show={showStats}
        onHide={closeModalStats}
        backdrop="static"
        keyboard={false}
        className="stats"
      >
        <Modal.Header closeButton>
          <Modal.Title>Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {`Score - ${score} / 10`}
          </p>
          <p>
            {`Round - ${round}`}
          </p>
          {
            guessedWords?.map((word) => (
              <Row className="row-word" key={word.id}>
                <Image
                  onClick={() => repeatAudio(word.audio)}
                  src={Voice}
                  alt={Voice}
                  className="stats-voice-repeat"
                />
                <p>{`- ${word.word} - ${word.wordTranslate}`}</p>
              </Row>
            ))
          }
        </Modal.Body>
        <Modal.Footer className="stats-footer">
          {NavLink(routes.LANDING, 'In menu')}
          <Button variant="primary" onClick={restart} width={80}>
            Restart
          </Button>
          <Button variant="primary" onClick={next} width={120}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StatsModal;
