import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';

const HelpModal = () => {
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
            <li>
              <p>
                Ход игры:звучит произношение слова на английском языке, нужно выбрать
                перевод слова из пяти предложенных вариантов ответа.
              </p>
            </li>
            <li>
              <p>
                В игре представлено 6 уровней сложности по 60 раундов в каждом уровне.
                Выбор уровня сложности и раунда находится в правом верхнем углу.
              </p>
            </li>
            <li>
              <p>
                Cлова можно угадывать выбирая их как кликами мышкой,
                так и нажатием кнопок клавиатуры.
              </p>
              <p>
                &quot;Клавиша 1&quot; - первое слово, &quot;Клавиша 2&quot; - второе, и так до 5.
              </p>
              <p>
                Выбот ответ &quot;Не знаю&quot; и переход к следующему вопросу происходит
                как при клике по кнопке &quot;Далее&quot;,
                так и нажатием клавиши Enter.
              </p>
            </li>
            <li>
              <p>
                В левом нижнем углу экрана находится регулировка звука произношения слово
                во время игры. Регулировка применятеся от 0 до 100 с шагом в 5.
              </p>
            </li>
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
