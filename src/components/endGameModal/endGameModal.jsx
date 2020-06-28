import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EndGameModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Выход из игры.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Статистика не законченного раунда не будет сохранена.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>Вернуться</Button>
        <Button href="#/">Выйти</Button>
      </Modal.Footer>
    </Modal>
  );
}

EndGameModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EndGameModal;
