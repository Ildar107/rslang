import React, { useContext, useState } from 'react';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import StoreContext from '../../app/store';
import Skeleton from '../../components/skeleton/Skeleton';
import userSettingsService from '../../services/user.settings.services';
import MessageModal from '../../components/messageModal/MessageModal';
import ErrorModal from '../../components/errorModal/ErrorModal';
import './learnSettings.scss';

const LearnSettings = () => {
  const context = useContext(StoreContext);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [wordsPerDay, setWordsPerDay] = useState(context.userSettings.wordsPerDay);
  const [cardsPerDay, setCardsPerDay] = useState(context.userSettings.cardsPerDay);

  const onSubmitForm = (e) => {
    e.preventDefault();
    userSettingsService.setUserSettings(context.jwt, context.userId, {
      wordsPerDay: e.target.words.value,
      cardsPerDay: e.target.cards.value,
      translate: e.target.translate.checked,
      explain: e.target.explanation.checked,
      example: e.target.example.checked,
      transcription: e.target.transcription.checked,
      wordImg: e.target.wordImg.checked,
      showAnswer: e.target.answer.checked,
      showDelete: e.target.delete.checked,
      showHard: e.target.hard.checked,
    }).then((x) => {
      if (!x.error) {
        const newSettings = { wordsPerDay: x.wordsPerDay, ...x.optional };
        context.userSettings = newSettings;
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
        setMessage('Settings updated!');
        setIsShowMessage(true);
      } else {
        setErrorMessage(x.error);
      }
    }).catch((error) => {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error);
      }
    });
  };

  const hideMessage = () => {
    setIsShowMessage(false);
  };

  const hideErorr = () => {
    setIsShowError(false);
  };

  return (
    <>
      <ErrorModal show={isShowError} onHide={hideErorr} errorMessage={errorMessage} />
      <MessageModal show={isShowMessage} onHide={hideMessage} message={message} />
      <Skeleton wrapperClass="learn-settings-page" title="Настройка обучения">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form onSubmit={onSubmitForm}>
                  <Form.Group>
                    <Form.Label>Количество новых слов</Form.Label>
                    <Form.Control type="number" placeholder="Введите число" id="words" required value={wordsPerDay} disabled />
                    <Form.Control
                      type="range"
                      defaultValue={wordsPerDay}
                      min={10}
                      max={40}
                      step={10}
                      onChange={(e) => {
                        setWordsPerDay(e.target.value);
                        if (cardsPerDay <= e.target.value) {
                          setCardsPerDay(Number(e.target.value) + 10);
                        }
                      }}
                    />
                    <Form.Text className="text-muted">
                      Новые слова которые вы хотите выучить за день
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Количество карточек в день</Form.Label>
                    <Form.Control type="number" placeholder="Введите число" id="cards" required value={cardsPerDay} disabled />
                    <Form.Control
                      type="range"
                      value={cardsPerDay}
                      min={20}
                      max={50}
                      step={10}
                      onChange={(e) => {
                        if ((wordsPerDay + 10) < e.target.value) {
                          setCardsPerDay(e.target.value);
                        }
                      }}
                    />
                    <Form.Text className="text-muted">
                      Количество карточек которые планируете изучать за 1 день
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="checkbox-group">
                    <p>Выводимы информация на карточках</p>
                    <Form.Check label="Перевод слова" type="checkbox" id="translate" defaultChecked={context.userSettings.translate} />
                    <Form.Check label="Транскрипция" type="checkbox" id="transcription" defaultChecked={context.userSettings.transcription} />
                    <Form.Check label="Ассоциативная картинка" type="checkbox" id="wordImg" defaultChecked={context.userSettings.wordImg} />
                    <Form.Check label="Предложение с объяснением слова" type="checkbox" id="explanation" defaultChecked={context.userSettings.explain} />
                    <Form.Check label="Предложение с примером использования слова" type="checkbox" id="example" defaultChecked={context.userSettings.example} />
                  </Form.Group>
                  <Form.Group className="checkbox-group">
                    <p>Кнопки управления словами</p>
                    <Form.Check label={'Отображение кнопки "Показать ответ"'} type="checkbox" id="answer" defaultChecked={context.userSettings.showAnswer} />
                    <Form.Check label={'Отображение кнопки "Удалить слово"'} type="checkbox" id="delete" defaultChecked={context.userSettings.showDelete} />
                    <Form.Check
                      label={'Отображение кнопки "Сложное слово" (добавляет'
                        + ' слово в'
                        + ' группу сложных слов)'}
                      type="checkbox"
                      id="hard"
                      defaultChecked={context.userSettings.showHard}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="settings-btn">
                    Сохранить
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};

export default LearnSettings;
