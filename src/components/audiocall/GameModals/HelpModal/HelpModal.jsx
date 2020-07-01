import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';

const HelpModal = ({ messages }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="help" onClick={handleShow}>
        ?
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Game Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {messages.map((item) => (
              <li>
                <p>
                  {item}
                </p>
              </li>
            ))}
          </ol>
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

export default HelpModal;
