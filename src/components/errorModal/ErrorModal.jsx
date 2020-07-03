import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './errorModal.scss';

const ErrorModal = (props) => (
  <Modal
    onHide={props.onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={props.show}
    backdrop="static"
    className="error-message__modal"
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter" className="text-dark-50 text-center mt-0 font-weight-bold">
        Error
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="error-message__container">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#F57A00" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="4.5" />
            <path strokeLinejoin="round" d="M5.8 3.6h.4L6 6.5z" />
            <circle cx="6" cy="8.2" r=".6" fill="#F57A00" stroke="none" />
          </svg>
        </div>
        <p className="text-center text-muted">{props.errorMessage}</p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={props.onHide}>Ok</Button>
    </Modal.Footer>
  </Modal>
);

ErrorModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorModal;
