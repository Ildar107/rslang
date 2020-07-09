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
  const [mask, setMask] = useState(null);
  const [showMask, setShowMask] = useState(false);
  const [readyForNext, setReadyForNext] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [isDifficult, setIsDifficult] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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

  const getMask = (maskWord) => {
    const wordArr = maskWord.toLowerCase().split('');
    while (wordArr.length < word.length) {
      wordArr.push('?');
    }
    return wordArr.map((it, num) => {
      const res = it === word[num] ? <span key={`${it}${num}`} className="true">{it}</span> : <span key={`${it}${num}`} className="false">{it}</span>;
      return res;
    });
  };

  const checkIsTypedWordRight = (curWord) => {
    setMask(getMask(curWord));
    inputEl.current.value = '';
    setShowMask(true);
    if (curWord === word) {
      setReadyForNext(true);
    } else {
      inputFocus();
    }
  };

  const onEnterWord = (e) => {
    if (e.key === 'Enter') {
      checkIsTypedWordRight(typedWord);
      console.log('-> ', difficulty);
    }
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
                        {mask}
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
                      key="check"
                      onClick={() => {
                        checkIsTypedWordRight(typedWord);
                      }}
                      variant="success"
                      type="button"
                      size="sm"
                    >
                      Проверить
                    </Button>
                    <Button
                      key="dn"
                      variant="danger"
                      type="button"
                      size="sm"
                      onClick={() => {
                        checkIsTypedWordRight(word);
                        setDifficulty('hard');
                      }}
                    >
                      Не знаю
                    </Button>
                    <div key="expl" className="explain__sentense">{explainSent}</div>
                    <div key="ex" className="example__sentense">{exampleSent}</div>
                    <div key="trans" className="translated__word">{translatedWord}</div>
                    <div key="tranex" className="translated__explain__sentense">{translatedExplainSentense}</div>
                    <div key="trexsent" className="translated__example__sentense">{translatedExampleSSentense}</div>
                    <div key="cont" className="repeat__container" />
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
                <p>Перед переходом к следующему слову выберите категории для текущего</p>
                <div className="words__control">
                  <Button
                    className={isDelete ? '' : 'disabled'}
                    onClick={() => {
                      if (!isDelete) setIsRepeat(false);
                      setIsDelete(!isDelete);
                    }}
                    key="del"
                    variant="primary"
                    type="button"
                  >
                    Удалить
                  </Button>
                  <Button
                    className={isRepeat ? '' : 'disabled'}
                    onClick={() => {
                      if (!isRepeat) setIsDelete(false);
                      setIsRepeat(!isRepeat);
                    }}
                    key="rep"
                    variant="primary"
                    type="button"
                  >
                    Повторять чаще
                  </Button>
                  <Button
                    className={isDifficult ? '' : 'disabled'}
                    onClick={() => setIsDifficult(!isDifficult)}
                    key="dif"
                    variant="primary"
                    type="button"
                  >
                    Сложное
                  </Button>
                </div>
                <div className="next-word">
                  {readyForNext && (
                  <Button
                    key="next"
                    variant="success"
                    type="button"
                    size="sm"
                  >
                    Перейти к следующему
                  </Button>
                  )}
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
