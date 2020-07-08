import React, { useState, useRef, useEffect } from 'react';
import {
  Row, Col, Card, Button,
} from 'react-bootstrap';
// import StoreContext from '../../app/store';
import Skeleton from '../../components/skeleton/Skeleton';
// import userSettingsService from '../../services/user.settings.services';
// import MessageModal from '../../components/messageModal/MessageModal';
// import ErrorModal from '../../components/errorModal/ErrorModal';
// import userWordsService from '../../services/user.words.services';
import './learnWords.scss';

const LearnWords = () => {
  // const context = useContext(StoreContext);

  const word = 'aaaaaaa';
  const explainSent = 'Something that give you understanding.';
  const exampleSent = 'I want explain you how it works.';
  const translatedWord = 'explain';
  const translatedExplainSentense = 'Что-то что дает понимание.';
  const translatedExampleSSentense = 'Я хочу объяснить тебе как это работает.';

  // const [enteredWord, setEnteredWord] = useState('');
  // const [word, setWord] = useState('');

  // const [isRight, setIsRight] = useState(false);
  // const [isWordEntered, setIsWordEntered] = useState(false);

  const [typedWord, setTypedWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [showMask, setShowMask] = useState(false);

  const inputEl = useRef();

  useEffect(() => { inputEl.current.focus(); }, []);

  // const [newWords, setNewWords] = useState([]);

  //   useEffect(async () => {
  //     const data = await userWordsService.getNewWords(
  //       context.jwt, context.userId, context.userSettings.wordsPerDay,
  //     );
  //     if (!data.error) {
  //       setNewWords(data.paginatedResults);
  //     }
  //     if (newWords.length > 0) {
  //       setWord(newWords.shift());
  //     }
  //   });

  const inputFocus = () => {
    inputEl.current.focus();
  };

  const checkIsTypedWordRight = () => {
    if (typedWord === word) {
      console.log(inputEl.current, '+');
    } else {
      inputFocus();
      setCheckedWord(typedWord);
      inputEl.current.value = '';
      setShowMask(true);
    }
  };

  const onEnterWord = (e) => {
    if (e.key === 'Enter') {
      checkIsTypedWordRight();
    }
  };

  const getMask = () => {
    const wordArr = checkedWord.toLowerCase().split('');
    return wordArr.map((it, num) => {
      const res = it === word[num] ? <span className="true">{it}</span> : <span className="false">{it}</span>;
      return res;
    });
  };

  return (
    <>
      {/* <ErrorModal show={isShowError} onHide={hideErorr} errorMessage={errorMessage} />
        <MessageModal show={isShowMessage} onHide={hideMessage} message={message} /> */}
      <Skeleton wrapperClass="learn-words-page" title="Изучение слов">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Body />
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="word__container">
                  <div className="word_img">
                    <img alt="" src="./images/railway.jpg" />
                  </div>
                  <div className="word__block">
                    <div className="unknown__word">
                      {showMask && (
                      <span
                        onClick={inputFocus}
                        className="word__mask"
                      >
                        {getMask()}
                      </span>
                      )}
                      <input
                        className="input__container"
                        style={{ width: `${word.length * 13 + 11}px` }}
                        maxLength={word.length}
                        ref={inputEl}
                        type="text"
                        onChange={(e) => {
                          setShowMask(false);
                          setTypedWord(e.target.value);
                        }}
                        onKeyDown={onEnterWord}
                      />

                    </div>
                    <Button
                      onClick={() => {
                        checkIsTypedWordRight();
                      }}
                      variant="info"
                      type="button"
                      size="sm"
                    >
                      Дальше
                    </Button>
                    <div className="explain__sentense">{explainSent}</div>
                    <div className="example__sentense">{exampleSent}</div>
                    <div className="translated__word">{translatedWord}</div>
                    <div className="translated__explain__sentense">{translatedExplainSentense}</div>
                    <div className="translated__example__sentense">{translatedExampleSSentense}</div>
                    <div className="repeat__container">
                      <Button variant="info" type="button" size="sm">
                        <i className="uil-repeat" />
                        Повторить
                      </Button>
                      <Button variant="info" type="button" size="sm">
                        Хорошо
                      </Button>
                      <Button variant="info" type="button" size="sm">
                        Легко
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="words__control">
                  <Button variant="primary" type="button">
                    Показать слово
                  </Button>
                  <Button variant="primary" type="button">
                    Удалить слово
                  </Button>
                  <Button variant="primary" type="button">
                    Сложные
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
export default LearnWords;
