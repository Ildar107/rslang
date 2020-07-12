import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './result-modal.scss';
import routes from '../../constants/routes';

function ResultModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Конец тренировки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Ваш резултат:
          {' '}
          {props.score}
          {' '}
          очков
        </h4>
        <p>
          Угадано
          {' '}
          {props.score}
          {' '}
          слов из 10
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Продолжить тренировку</Button>
        <Link to={routes.MINI_GAMES} className="btn btn-outline-success btn-lg btn-result">К списку тренировок</Link>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;
