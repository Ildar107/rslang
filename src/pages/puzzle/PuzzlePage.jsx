import React from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import 'materialize-css/sass/materialize.scss';
import './puzzlePage.scss';
import { Container, Row, Col } from 'react-bootstrap';
import DragNdrop from './dragNdrop';
import GameField from './gameField';
import SetLevel from './setLevel';
import BottomButtons from './bottomButtons';
import Translation from './translation';
import PromptButtons from './promptButtons';
import Paintings from './paintings';
import Header from '../../components/header/Header';
import StatisticModal from './statisticModal';

class PuzzlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsData: null,
      difficulty: 0,
      pageNumber: 0,
      allInSelected: false,
      check: false,
      win: false,
      dontKnow: false,
      continuer: false,
      translation: null,
      numOfSentence: 0,
      buttons: false,
      next: false,
      autoListeningPrompt: localStorage.getItem('autoListeningPrompt') !== 'false',
      translationPrompt: localStorage.getItem('translationPrompt') !== 'false',
      listeningPrompt: localStorage.getItem('listeningPrompt') !== 'false',
      backgroundPrompt: localStorage.getItem('backgroundPrompt') === 'true',
      audioStart: false,
      playingAudio: null,
      arrayOfMistakes: [],
    };
    this.getWordsData = this.getWordsData.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this.setPageNumber = this.setPageNumber.bind(this);
    this.setAllInSelected = this.setAllInSelected.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.setWin = this.setWin.bind(this);
    this.setDontKnow = this.setDontKnow.bind(this);
    this.setContinue = this.setContinue.bind(this);
    this.setNumOfSentence = this.setNumOfSentence.bind(this);
    this.setButtons = this.setButtons.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.setNext = this.setNext.bind(this);
    this.setAutoListeningPrompt = this.setAutoListeningPrompt.bind(this);
    this.setListeningPrompt = this.setListeningPrompt.bind(this);
    this.setTranslationPrompt = this.setTranslationPrompt.bind(this);
    this.setBackgroundPrompt = this.setBackgroundPrompt.bind(this);
    this.randomInteger = this.randomInteger.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.audioPlay = this.audioPlay.bind(this);
    this.setArrayOfMistakes = this.setArrayOfMistakes.bind(this);
  }

  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  audioPlay() {
    if (this.state.playingAudio) {
      this.state.playingAudio.pause();
      this.state.playingAudio.currentTime = 0;
    }
    const [, fileName] = this.state.wordsData[this.state.numOfSentence].audioExample.split('/');
    const audio = new Audio(`https://raw.githubusercontent.com/evshipilo/rslang-data/master/data/${fileName}`);
    this.setState({ playingAudio: audio });
    audio.play();
    audio.onplaying = () => this.setState({ audioStart: true });
    audio.onended = () => this.setState({ audioStart: false });
  }

  async getWordsData(difficulty, pageNumber) {
    try {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${difficulty}`;
      const res = await fetch(url);
      const data = await res.json();
      data.sort((a, b) => {
        if (a.textExample.length > b.textExample.length) return 1;
        if (a.textExample.length < b.textExample.length) return -1;
        return 0;
      });
      const dataSlice = data.slice(0, 10);
      dataSlice.forEach((it) => {
        const item = it;
        item.textExample = item.textExample.replace(/(<b>)|(<\/b>)|([,.!?])/g, '');
      });
      const num = this.randomInteger(1, 125);
      dataSlice[0].background = `images/${Paintings[num].cutSrc}`;
      dataSlice[0].description = `"${Paintings[num].name}", author: ${Paintings[num].author}, ${Paintings[num].year} year.`;
      this.setState({ wordsData: dataSlice });
    } catch (e) {
      this.setState({ wordsData: null });
      this.setState({
        translation: 'cant fetch data, select level &'
            + ' page and click GO!',
      });
    }
  }

  async nextPage() {
    let page;
    let diff;
    if (+this.state.pageNumber < 29) {
      page = +this.state.pageNumber + 1;
      diff = +this.state.difficulty;
    } else if (+this.state.difficulty < 5) {
      page = 0;
      diff = +this.state.difficulty + 1;
    } else {
      page = 0;
      diff = 0;
    }
    this.setState({ pageNumber: page });
    this.setState({ difficulty: diff });
    await this.getWordsData(diff, page);
  }

  setArrayOfMistakes(arr) {
    this.setState({ arrayOfMistakes: arr });
  }

  setAutoListeningPrompt(bool) {
    this.setState({ autoListeningPrompt: bool });
  }

  setListeningPrompt(bool) {
    this.setState({ listeningPrompt: bool });
  }

  setTranslationPrompt(bool) {
    this.setState({ translationPrompt: bool });
  }

  setBackgroundPrompt(bool) {
    this.setState({ backgroundPrompt: bool });
  }

  setNext(bool) {
    this.setState({ next: bool });
  }

  setButtons(bool) {
    this.setState({ buttons: bool });
  }

  setNumOfSentence(data) {
    this.setState({ numOfSentence: data });
  }

  setContinue(bool) {
    this.setState({ continuer: bool });
  }

  setWin(bool) {
    this.setState({ win: bool });
  }

  setDontKnow(bool) {
    this.setState({ dontKnow: bool });
  }

  setDifficulty(diff) {
    this.setState({ difficulty: diff });
  }

  setPageNumber(page) {
    this.setState({ pageNumber: page });
  }

  setAllInSelected(bool) {
    this.setState({ allInSelected: bool });
  }

  setCheck(bool) {
    this.setState({ check: bool });
  }

  async componentDidMount() {
    const difficulty = +localStorage.getItem('difficulty') || 0;
    const pageNumber = +localStorage.getItem('pageNumber') || 0;
    this.setState({ difficulty });
    this.setState({ pageNumber });
    M.AutoInit();
    await this.getWordsData(difficulty, pageNumber);
    window.addEventListener('beforeunload', this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  onUnload() {
    localStorage.setItem('difficulty', this.state.difficulty);
    localStorage.setItem('pageNumber', this.state.pageNumber);
    localStorage.setItem('listeningPrompt', this.state.listeningPrompt);
    localStorage.setItem('autoListeningPrompt', this.state.autoListeningPrompt);
    localStorage.setItem('backgroundPrompt', this.state.backgroundPrompt);
    localStorage.setItem('translationPrompt', this.state.translationPrompt);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.next && !prevState.next) {
      this.setState({ translation: this.state.wordsData[0].description });
    }
    if (!this.state.next && this.state.translationPrompt && !prevState.translationPrompt) {
      this.setState({
        translation: this.state.wordsData[this.state.numOfSentence].textExampleTranslate || null,
      });
    }
    if (!this.state.next && !this.state.translationPrompt && prevState.translationPrompt) {
      this.setState({
        translation: null,
      });
    }
    if (prevState.wordsData && this.state.translationPrompt) {
      if (this.state.wordsData[this.state.numOfSentence].id
          !== prevState.wordsData[prevState.numOfSentence].id) {
        this.setState({
          translation: this.state.wordsData[this.state.numOfSentence].textExampleTranslate,
        });
      }
    }
    if (!prevState.wordsData && this.state.wordsData && this.state.translationPrompt) {
      this.setState({
        translation: this.state.wordsData[0].textExampleTranslate,
      });
    }
    if (prevState.wordsData && this.state.autoListeningPrompt
        && this.state.wordsData[this.state.numOfSentence].id
        !== prevState.wordsData[prevState.numOfSentence].id
        && prevState.numOfSentence !== 9) this.audioPlay();
    if (!prevState.wordsData && this.state.wordsData
        && this.state.autoListeningPrompt) {
      this.audioPlay();
    }
  }

  render() {
    let audio;
    if (this.state.listeningPrompt && this.state.audioStart) {
      audio = (
        <button className="btn-small brown lighten-4 waves-effect waves-light audio-start">
          <i
            className="material-icons "
          >
            volume_up
          </i>
        </button>
      );
    }
    if (this.state.listeningPrompt && !this.state.audioStart) {
      audio = (
        <button
          className="btn-small brown lighten-4 waves-effect waves-light audio-start "
          onClick={() => {
            this.audioPlay();
          }}
        >
          <i
            className="material-icons "
          >
            volume_mute
          </i>
        </button>
      );
    }

    return (
      <>
        <Header />
        <Container>
          <StatisticModal
            next={this.state.next}
            wordsData={this.state.wordsData}
            arrayOfMistakes={this.state.arrayOfMistakes}
          />
          <Row>
            <Col xs={12} lg={6} className="set-level center">
              <SetLevel
                setDifficulty={this.setDifficulty}
                setPageNumber={this.setPageNumber}
                difficulty={this.state.difficulty}
                pageNumber={this.state.pageNumber}
                getWordsData={this.getWordsData}
                setNext={this.setNext}
              />
            </Col>
            <Col xs={12} lg={6} className="set-prompt">
              <PromptButtons
                translationPrompt={this.state.translationPrompt}
                listeningPrompt={this.state.listeningPrompt}
                autoListeningPrompt={this.state.autoListeningPrompt}
                backgroundPrompt={this.state.backgroundPrompt}
                setTranslationPrompt={this.setTranslationPrompt}
                setListeningPrompt={this.setListeningPrompt}
                setAutoListeningPrompt={this.setAutoListeningPrompt}
                setBackgroundPrompt={this.setBackgroundPrompt}
              />
            </Col>

          </Row>
          <Row>
            <Col xs={12} className="audio center">
              {audio}
            </Col>
            <Col xs={12} className="translation">
              <Translation
                translation={this.state.translation}
              />
            </Col>
          </Row>
          <Row>
            <GameField
              wordsData={this.state.wordsData}
              numOfSentence={this.state.numOfSentence}
              continuer={this.state.continuer}
              next={this.state.next}
              backgroundPrompt={this.state.backgroundPrompt}
            >
              <DragNdrop
                wordsData={this.state.wordsData}
                setAllInSelected={this.setAllInSelected}
                allInSelected={this.state.allInSelected}
                setCheck={this.setCheck}
                check={this.state.check}
                win={this.state.win}
                setWin={this.setWin}
                dontKnow={this.state.dontKnow}
                continuer={this.state.continuer}
                setContinue={this.setContinue}
                setNumOfSentence={this.setNumOfSentence}
                setButtons={this.setButtons}
                nextPage={this.nextPage}
                next={this.state.next}
                setNext={this.setNext}
                backgroundPrompt={this.state.backgroundPrompt}
                arrayOfMistakes={this.state.arrayOfMistakes}
                setArrayOfMistakes={this.setArrayOfMistakes}
              />
            </GameField>
          </Row>
          <Row>
            <Col className="bottom-buttons center">
              <BottomButtons
                allInSelected={this.state.allInSelected}
                setCheck={this.setCheck}
                setDontKnow={this.setDontKnow}
                win={this.state.win}
                setContinue={this.setContinue}
                buttons={this.state.buttons}
                next={this.state.next}
                setNext={this.setNext}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PuzzlePage;
