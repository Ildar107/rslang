/* eslint-disable no-nested-ternary */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  Row, Col, Card, Button,
} from 'react-bootstrap';
import StoreContext from '../../app/store';
import Skeleton from '../../components/skeleton/Skeleton';
import userWordsService from '../../services/user.words.services';
import './learnWords.scss';
import Loader from '../../components/loader/Loader';

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

  const [typedWord, setTypedWord] = useState('');
  const [mask, setMask] = useState(null);
  const [showMask, setShowMask] = useState(false);
  const [readyForNext, setReadyForNext] = useState(false);
  const [isDifficult, setIsDifficult] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [enableSound, setEnableSound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
  const [alreadyTried, setAlreadyTried] = useState(false);

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

  const [wordObjects, setWordsObj] = useState(JSON.parse(localStorage.getItem('wordObjects')) || []);
  const [currentWordIndex, setCurrentWordIndex] = useState(+localStorage.getItem('currentWordIndex') || 0);
  const [rightAnswers, setRightAnswers] = useState(+localStorage.getItem('rightAnswers') || 0);
  const [newWordsCount, setNewWordsCount] = useState(+localStorage.getItem('newWordsCount') || 0);
  const [longestStreak, setLongestStreak] = useState(+localStorage.getItem('longestStreak') || 0);
  const [currentStreak, setCurrentStreak] = useState(+localStorage.getItem('currentStreak') || 0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setCurrentWordIndex(0);
      localStorage.setItem('currentWordIndex', 0);
      setRightAnswers(0);
      localStorage.setItem('rightAnswers', 0);
      setLongestStreak(0);
      localStorage.setItem('longestStreak', 0);
      setCurrentStreak(0);
      localStorage.setItem('currentStreak', 0);
      localStorage.setItem('currentUserId', userId);
      const [data] = await userWordsService.getWords(
        jwt, userId, 200,
      );
      const date = new Date().toLocaleDateString();
      setTodayDate(date);
      localStorage.setItem('todayDate', date);

      let { paginatedResults } = data;
      paginatedResults = paginatedResults.map((wordObj) => {
        const {
          image,
          audio,
          audioMeaning,
          audioExample,
          textMeaning,
          textExample,
          word,
        } = wordObj;
        wordObj.image = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${image}`;
        wordObj.audio = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audio}`;
        wordObj.audioMeaning = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audioMeaning}`;
        wordObj.audioExample = `https://raw.githubusercontent.com/alexgabrielov/rslang-data/master/${audioExample}`;
        wordObj.textMeaning = textMeaning.replace('<i>', '').replace('</i>', '');
        wordObj.textExample = textExample.replace('<b>', '').replace('</b>', '');
        wordObj.word = word.toLowerCase();
        return wordObj;
      });
      if (!data.error) {
        let wordsArray = paginatedResults
          .filter((wordObj) => !wordObj.userWord)
          .slice(0, wordsPerDay);
        localStorage.setItem('wordsPerDayCurrent', wordsPerDay);
        const wordsToRepeat = paginatedResults
          .filter((wordObj) => wordObj.userWord?.optional?.isRepeat
            && wordObj.userWord?.optional?.isDelete === false);
        if (wordsPerDay + wordsToRepeat.length > cardsPerDay) {
          const difference = cardsPerDay - wordsPerDay;
          wordsArray = wordsArray.concat(wordsToRepeat.slice(0, difference));
          const shuffled = getShuffledArr(wordsArray);
          setWordsObj(shuffled);
          localStorage.setItem('wordObjects', JSON.stringify(shuffled));
          localStorage.setItem('newWordsCount', wordsPerDay);
          setNewWordsCount(wordsPerDay);
          setIsLoading(false);
          return;
        }
        wordsArray = wordsArray.concat(wordsToRepeat);

        const restOfTheUserWords = paginatedResults
          .filter((wordObj) => wordObj.userWord?.optional?.isDelete === false
            && wordObj.userWord?.optional?.isRepeat === false);
        if (wordsArray.length + restOfTheUserWords.length > cardsPerDay) {
          const difference = cardsPerDay - wordsArray.length;
          wordsArray = wordsArray.concat(restOfTheUserWords.slice(0, difference));
          const shuffled = getShuffledArr(wordsArray);
          setWordsObj(shuffled);
          localStorage.setItem('wordObjects', JSON.stringify(shuffled));
          localStorage.setItem('newWordsCount', wordsPerDay);
          setNewWordsCount(wordsPerDay);
          setIsLoading(false);
          return;
        }
        wordsArray = wordsArray.concat(restOfTheUserWords);

        const difference = cardsPerDay - wordsArray.length;
        const newWordsToFillArray = paginatedResults
          .filter((wordObj) => !wordObj.userWord)
          .slice(wordsPerDay, wordsPerDay + difference);
        wordsArray = wordsArray.concat(newWordsToFillArray);
        const shuffled = getShuffledArr(wordsArray);
        setWordsObj(shuffled);
        localStorage.setItem('wordObjects', JSON.stringify(shuffled));
        localStorage.setItem('newWordsCount', wordsPerDay + newWordsToFillArray.length);
        setNewWordsCount(wordsPerDay + newWordsToFillArray.length);
      }
      setIsLoading(false);
    }
    if (todayDate !== localStorage.getItem('todayDate')
      || wordObjects.length !== +cardsPerDay
      || userId !== localStorage.getItem('currentUserId')
      || wordsPerDay !== +localStorage.getItem('wordsPerDayCurrent')) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (currentWordIndex < +cardsPerDay) inputEl.current.focus();
  }, []);

  useEffect(() => {
    if (currentWordIndex < +cardsPerDay) inputEl.current.focus();
  }, [readyForNext]);

  const inputFocus = () => {
    inputEl.current.focus();
  };

  const currentWordObj = wordObjects[currentWordIndex];

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

  const [aud1, setAud1] = useState(new Audio());
  const [aud2, setAud2] = useState(new Audio());
  const [aud3, setAud3] = useState(new Audio());

  function audioPlay() {
    if (enableSound) {
      let fileExplain;
      let fileExample;
      const fileWord = currentWordObj?.audio;
      example ? fileExample = currentWordObj?.audioExample : null;
      explain ? fileExplain = currentWordObj?.audioMeaning : null;
      const audio1 = new Audio(fileWord);
      const audio3 = new Audio(fileExample);
      const audio2 = new Audio(fileExplain);

      setAud1(audio1);
      setAud2(audio2);
      setAud3(audio3);

      audio1.play();
      audio1.onended = () => audio2.play();
      audio2.onended = () => audio3.play();
    }
  }

  const checkIsTypedWordRight = (curWord) => {
    setMask(getMask(curWord));
    inputEl.current.value = '';
    setShowMask(true);
    if (curWord === currentWordObj?.word) {
      audioPlay();
      setReadyForNext(true);
      return true;
    }
    inputFocus();
    return false;
  };
  const onEnterWord = (e) => {
    if (e.key === 'Enter' && !readyForNext) {
      const result = checkIsTypedWordRight(typedWord);
      if (result && !alreadyTried) {
        localStorage.setItem('rightAnswers', +rightAnswers + 1);
        setRightAnswers(rightAnswers + 1);
        localStorage.setItem('currentStreak', +currentStreak + 1);
        setCurrentStreak(currentStreak + 1);
        if (longestStreak < currentStreak) {
          localStorage.setItem('longestStreak', currentStreak);
          setLongestStreak(currentStreak);
        }
      } else {
        setAlreadyTried(true);
        localStorage.setItem('currentStreak', 0);
        setCurrentStreak(0);
        setIsRepeat(true);
      }
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
      {isLoading ? <Loader /> : currentWordIndex < +cardsPerDay ? (
        <Skeleton wrapperClass="learn-words-page" title="Изучение слов">
          <div className="progress-container">
            <span>
              Score
              {' '}
              {`${currentWordIndex} / ${cardsPerDay}`}
            </span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${currentWordIndex * (100 / cardsPerDay)}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
          <Row className="justify-content-md-center">
            <Col xl={8}>
              <Card>
                <Card.Body>
                  <div className="word__container">
                    {enableSound ? (
                      <Button
                        className="sound-btn"
                        key="dnff"
                        variant="link"
                        type="button"
                        size="sm"
                        onClick={() => {
                          setEnableSound(false);
                          aud1.pause();
                          aud2.pause();
                          aud3.pause();
                        }}
                      >
                        <i className="uil uil-volume-up"> </i>
                      </Button>
                    )
                      : (
                        <Button
                          className="sound-btn"
                          key="dnff"
                          variant="link"
                          type="button"
                          size="sm"
                          onClick={() => {
                            setEnableSound(true);
                          }}
                        >
                          <i className="uil uil-volume-mute"> </i>
                        </Button>
                      )}
                    <div className="word_img">
                      {wordImg && <img alt="" src={currentWordObj?.image} />}
                    </div>
                    <div className="word__block">
                      <div className="unknown__word">
                        {showMask && (
                          <span
                            onClick={() => { if (!readyForNext) inputFocus(); }}
                            className="word__mask"
                          >
                            {mask}
                          </span>
                        )}
                        <input
                          className="input__container"
                          style={{ width: `${currentWordObj?.word.length * 18 + 15}px` }}
                          maxLength={currentWordObj?.word.length}
                          disabled={!!readyForNext}
                          ref={inputEl}
                          type="text"
                          onChange={(e) => {
                            setShowMask(false);
                            setTypedWord(e.target.value);
                          }}
                          onKeyDown={onEnterWord}
                        />

                      </div>
                      {!readyForNext && (
                        <Button
                          className="check-btn"
                          key="check"
                          onClick={() => {
                            const result = checkIsTypedWordRight(typedWord);
                            if (result && !alreadyTried) {
                              localStorage.setItem('rightAnswers', +rightAnswers + 1);
                              setRightAnswers(rightAnswers + 1);
                              localStorage.setItem('currentStreak', +currentStreak + 1);
                              setCurrentStreak(currentStreak + 1);
                              if (longestStreak < currentStreak) {
                                localStorage.setItem('longestStreak', currentStreak);
                                setLongestStreak(currentStreak);
                              }
                            } else {
                              setAlreadyTried(true);
                              localStorage.setItem('currentStreak', 0);
                              setCurrentStreak(0);
                              setIsRepeat(true);
                            }
                          }}
                          variant="success"
                          type="button"
                          size="sm"
                        >
                          Проверить
                        </Button>
                      )}
                      {showAnswer && !readyForNext && (
                        <Button
                          className="show-btn"
                          key="dn"
                          variant="danger"
                          type="button"
                          size="sm"
                          onClick={() => {
                            checkIsTypedWordRight(currentWordObj?.word);
                            localStorage.setItem('currentStreak', 0);
                            setCurrentStreak(0);
                            setIsRepeat(true);
                          }}
                        >
                          Показать ответ
                        </Button>
                      )}
                      {translate && <div key="trans" className="translated__word line">{currentWordObj?.wordTranslate}</div>}
                      {transcription && <div key="transkrip" className="translated__word line">{currentWordObj?.transcription}</div>}
                      {explain && <div key="expl" className="explain__sentense line">{getRightSentence(currentWordObj?.textMeaning)}</div>}
                      {explain && readyForNext && <div key="tranex" className="translated__explain__sentense">{currentWordObj?.textMeaningTranslate}</div>}
                      {example && <div key="ex" className="example__sentense line">{getRightSentence(currentWordObj?.textExample)}</div>}
                      {example && readyForNext && <div key="trexsent" className="translated__example__sentense">{currentWordObj?.textExampleTranslate}</div>}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xl={8}>
              {readyForNext && (
                <Card>
                  <Card.Body>
                    <div className="words__control">
                      {showDelete && readyForNext && (
                        <Button
                          className={isDelete ? '' : 'disabled'}
                          onClick={() => {
                            if (isDifficult && !isDelete) setIsDifficult(false);
                            setIsDelete(!isDelete);
                          }}
                          key="del"
                          variant="primary"
                          type="button"
                        >
                          Удалить слово
                        </Button>
                      )}
                      {showHard && readyForNext && (
                        <Button
                          className={isDifficult ? '' : 'disabled'}
                          onClick={() => {
                            if (!isDifficult && isDelete) setIsDelete(false);
                            setIsDifficult(!isDifficult);
                          }}
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
                          onClick={() => {
                            userWordsService.sendWords(
                              jwt,
                              userId,
                              currentWordObj,
                              {
                                isRepeat,
                                isDelete,
                                isDifficult,
                                todayDate,
                              },
                            );
                            setIsRepeat(false);
                            setIsDelete(false);
                            setIsDifficult(false);
                            setReadyForNext(false);
                            setAlreadyTried(false);
                            setMask(null);
                            setShowMask(false);
                            setTypedWord('');
                            inputEl.current.value = '';
                            localStorage.setItem('currentWordIndex', +currentWordIndex + 1);
                            setCurrentWordIndex(+currentWordIndex + 1);
                            aud1.pause();
                            aud2.pause();
                            aud3.pause();
                            inputFocus();
                          }}
                        >
                          Перейти к следующему
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Skeleton>
      ) : (
        <Skeleton wrapperClass="learn-words-stats" title="Результаты дня">
          <h2>Серия завершена</h2>
          <div className="stats-info">
            <div className="stats-item">
              <span>Карточек завершено -</span>
              <span>{` ${cardsPerDay}`}</span>
            </div>
            <div className="stats-item">
              <span>Правильные ответы -</span>
              <span>{` ${rightAnswers}`}</span>
            </div>
            <div className="stats-item">
              <span>Новые слова -</span>
              <span>{` ${newWordsCount}`}</span>
            </div>
            <div className="stats-item">
              <span>Самая длинная серия правильных слов -</span>
              <span>{` ${longestStreak + 1}`}</span>
            </div>
          </div>
        </Skeleton>
      )}
    </>
  );
};
export default LearnWords;
