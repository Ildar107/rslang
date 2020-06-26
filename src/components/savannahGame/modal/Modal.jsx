/* eslint-disable react/prop-types */
/* eslint-disable no-void */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalWindow = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
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
      <a href="#">К списку Тренировок</a>
    </Modal.Footer>
  </Modal>
);

export default ModalWindow;
