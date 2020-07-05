import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MessageModal = (props) => (
  <Modal
    onHide={props.onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={props.show}
    backdrop="static"
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter" className="text-dark-50 text-center mt-0 font-weight-bold">
        Info
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="text-center text-muted">{props.message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={props.onHide}>Ok</Button>
    </Modal.Footer>
  </Modal>
);

MessageModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageModal;
