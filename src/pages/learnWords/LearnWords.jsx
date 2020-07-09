import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  Row, Col, Card, Button,
} from 'react-bootstrap';
import StoreContext from '../../app/store';
import Skeleton from '../../components/skeleton/Skeleton';
// import userSettingsService from '../../services/user.settings.services';
// import MessageModal from '../../components/messageModal/MessageModal';
// import ErrorModal from '../../components/errorModal/ErrorModal';
import userWordsService from '../../services/user.words.services';
import './learnWords.scss';

const getShuffledArr = (arr) => {
  if (!arr) return [];
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const LearnWords = () => {
  const context = useContext(StoreContext);

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
  const [isDifficult, setIsDifficult] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [enableSound, setEnableSound] = useState(true);

  const inputEl = useRef();
  const { jwt, userId, userSettings } = context;
  const {
    cardsPerDay,
    example,
    explain,
    showAnswer,
    showDelete,
    showHard,
    transcription,
    translate,
    wordImg,
    wordsPerDay,
  } = userSettings;

  const [wordObjects, setWordsObj] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // const [solved, setSolved] = useState(false);
  // const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [data] = await userWordsService.getWords(
        jwt, userId, 200,
      );
      let { paginatedResults } = data;
      paginatedResults = paginatedResults.map((wordObj) => {
        const {
          image,
          audio,
          audioMeaning,
          audioExample,
          textMeaning,
          textExample,
        } = wordObj;
        wordObj.image = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${image}`;
        wordObj.audio = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audio}`;
        wordObj.audioMeaning = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audioMeaning}`;
        wordObj.audioExample = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audioExample}`;
        wordObj.textMeaning = textMeaning.replace('<i>', '').replace('</i>', '');
        wordObj.textExample = textExample.replace('<b>', '').replace('</b>', '');
        return wordObj;
      });
      // console.log(jwt, userId, userSettings, paginatedResults.filter((wordObj) => wordObj.userWord));
      if (!data.error) {
        let wordsArray = paginatedResults
          .filter((wordObj) => !wordObj.userWord)
          .slice(0, wordsPerDay);

        const wordsToRepeat = paginatedResults.filter((wordObj) => wordObj.userWord?.optional?.isRepeat);
        if (wordsPerDay + wordsToRepeat.length > cardsPerDay) {
          const difference = cardsPerDay - wordsPerDay;
          wordsArray = wordsArray.concat(wordsToRepeat.slice(0, difference));
          const shuffled = getShuffledArr(wordsArray);
          setWordsObj(shuffled);
          console.log('1', wordsArray);
          return;
        }
        wordsArray = wordsArray.concat(wordsToRepeat);

        const restOfTheUserWords = paginatedResults.filter((wordObj) => wordObj.userWord?.optional?.isDelete === false
        && wordObj.userWord?.optional?.isRepeat === false);
        console.log(restOfTheUserWords);
        if (wordsArray.length + restOfTheUserWords.length > cardsPerDay) {
          const difference = cardsPerDay - wordsArray.length;
          wordsArray = wordsArray.concat(restOfTheUserWords.slice(0, difference));
          const shuffled = getShuffledArr(wordsArray);
          setWordsObj(shuffled);
          console.log('2', wordsArray);
          return;
        }
        wordsArray = wordsArray.concat(restOfTheUserWords);
        console.log(wordsArray);

        const difference = cardsPerDay - wordsArray.length;
        const newWordsToFillArray = paginatedResults.filter((wordObj) => !wordObj.userWord).slice(wordsPerDay, wordsPerDay + difference);
        console.log(newWordsToFillArray);
        wordsArray = wordsArray.concat(newWordsToFillArray);
        const shuffled = getShuffledArr(wordsArray);
        console.log(shuffled);
        setWordsObj(shuffled);

        // const difficultWords = paginatedResults.filter((wordObj) => wordObj.userWord?.optional?.isDifficult);
        // const deletedWords = paginatedResults.filter((wordObj) => wordObj.userWord?.optional?.isDelete);

        // console.log(restOfTheUserWords);
        // setWords(wordsArray);
      }
    // if (words.length > 0) {
    //   setWord(words.shift());
    // }
    }
    fetchData();
  }, []);
  useEffect(() => { inputEl.current.focus(); }, []);

  const inputFocus = () => {
    inputEl.current.focus();
  };

  const currentWordObj = wordObjects[currentWordIndex];
  console.log(currentWordObj);

  const getMask = (maskWord) => {
    const wordArr = maskWord.toLowerCase().split('');
    while (wordArr.length < currentWordObj?.word.length) {
      wordArr.push('?');
    }
    return wordArr.map((it, num) => {
      const res = it === currentWordObj?.word[num] ? (
        <span
          key={`${it}${num}`}
          className="true"
        >
          {it}
        </span>
      ) : (
        <span
          key={`${it}${num}`}
          className="false"
        >
          {it}
        </span>
      );
      return res;
    });
  };

  const checkIsTypedWordRight = (curWord) => {
    setMask(getMask(curWord));
    inputEl.current.value = '';
    setShowMask(true);
    if (curWord === currentWordObj?.word) {
      setReadyForNext(true);
    } else {
      inputFocus();
    }
  };
  const onEnterWord = (e) => {
    if (e.key === 'Enter') {
      checkIsTypedWordRight(typedWord);
    }
  };

  const getRightSentence = (sent) => {
    if (currentWordObj?.word && sent) {
      const reg = new RegExp(`${currentWordObj?.word}`, 'gi');
      if (!readyForNext) {
        return sent.replace(reg, '<...>');
      } return sent;
    }
    return null;
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
                  {enableSound ? (
                    <Button
                      className="sound-btn"
                      key="dnff"
                      variant="light"
                      type="button"
                      size="sm"
                      onClick={() => {
                        setEnableSound(!enableSound);
                      }}
                    >
                      <i className="uil uil-volume-up"> </i>
                    </Button>
                  )
                    : (
                      <Button
                        className="sound-btn"
                        key="dnff"
                        variant="light"
                        type="button"
                        size="sm"
                        onClick={() => {
                          setEnableSound(!enableSound);
                        }}
                      >
                        <i className="uil uil-volume-mute"> </i>
                      </Button>
                    )}
                  <div className="word_img">
                    <img alt="" src={currentWordObj?.image} />
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
                        style={{ width: `${currentWordObj?.word.length * 18 + 15}px` }}
                        maxLength={currentWordObj?.word.length}
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
                    {showAnswer && (
                    <Button
                      key="dn"
                      variant="danger"
                      type="button"
                      size="sm"
                      onClick={() => {
                        checkIsTypedWordRight(currentWordObj?.word);
                        setIsRepeat(true);
                      }}
                    >
                      Показать ответ
                    </Button>
                    )}
                    {explain && <div key="expl" className="explain__sentense">{getRightSentence(currentWordObj?.textMeaning)}</div>}
                    {explain && readyForNext && <div key="tranex" className="translated__explain__sentense">{currentWordObj?.textMeaningTranslate}</div>}
                    {example && <div key="ex" className="example__sentense">{getRightSentence(currentWordObj?.textExample)}</div>}
                    {example && readyForNext && <div key="trexsent" className="translated__example__sentense">{currentWordObj?.textExampleTranslate}</div>}
                    {translate && <div key="trans" className="translated__word">{currentWordObj?.wordTranslate}</div>}
                    {transcription && <div key="transkrip" className="translated__word">{currentWordObj?.transcription}</div>}
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
                <div className="words__control">
                  {showDelete && (
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
                    Удалить слово
                  </Button>
                  )}
                  {showHard && (
                  <Button
                    className={isDifficult ? '' : 'disabled'}
                    onClick={() => setIsDifficult(!isDifficult)}
                    key="dif"
                    variant="primary"
                    type="button"
                  >
                    Сложное слово
                  </Button>
                  )}
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
