import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';

const StatsModal = (props) => {
  const {
    score, guessedWords, round, showStats,
  } = props.stats;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show || showStats}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {`${score} / 10`}
          </p>
          <p>
            {`Round - ${round}`}
          </p>
          {guessedWords?.map((word) => (<p key={word.id}>{word.word}</p>))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StatsModal;
