import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import './team-modal.scss';

const TeamModal = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Выполненные задачи:
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ListGroup variant="flush">
        {props.works.map((item) => <ListGroup.Item>{item}</ListGroup.Item>)}
      </ListGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
);

export default TeamModal;
