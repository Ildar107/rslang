import React, { Component } from 'react';
import {
  Container,
  Row,
  ProgressBar,
  Col,
  Spinner,
  Carousel,
  Pagination,
  Form,
} from 'react-bootstrap';
import GameCard from './GameCard/GameCard';
import HelpModal from './GameModals/HelpModal/HelpModal';
import StatsModal from './GameModals/StatsModal/StatsModal';
import BG from '../../assets/images/audiocall-bg.svg';
import './audiocall.scss';

import { chunk } from './GameLogic/processedWords';
import { AUDIOCALL_HELP } from '../../constants/gamesHelp';

const mediaUrl = 'https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/master/';

class AudioCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      rounds: [],
      curRound: 0,
      level: 1,
      curCard: 0,
      volume: 0.5,
      stats: {
        score: 0,
        guessedWords: [],
        round: 0,
        showStats: false,
      },
      pages: Array.from({ length: 10 }, (x, i) => i + 1),
    };
  }

  componentDidMount() {
    const { level } = this.state;
    this.getWords(level);
  }

  getWords = (level) => fetch(`https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/groups/data/group${level}.json`)
    .then((res) => res.json())
    .then(async (data) => {
      const processedData = this.formatMedia(data);
      await this.setState({
        rounds: chunk(processedData, 10),
      });
      setTimeout(() => {
        this.setState({ isUpdateCards: false });
        this.playAudio();
      }, 500);
    })

  formatMedia = (data) => {
    const newData = data.map((words) => {
      words.map((word) => {
        word.image = mediaUrl + word.image;
        word.audio = mediaUrl + word.audio;
        return word;
      });
      return words;
    });
    return newData;
  }

  playAudio = () => {
    const {
      curCard, curRound, rounds, volume,
    } = this.state;
    const curWords = rounds[curRound][curCard];
    if (curWords) {
      const curAudio = new Audio(curWords[0].audio);
      this.setState({ curAudio });
      curAudio.volume = volume;
      curAudio.play();
    }
  }

  repeatAudio = () => {
    const { curAudio, volume } = this.state;
    curAudio.volume = volume;
    curAudio.play();
  }

  changeVolume = (e) => {
    this.setState({ volume: e.target.value / 20 });
  }

  activeCard = () => {
    const { curCard } = this.state;
    return curCard;
  }

  nextCard = async (answer) => {
    const {
      curCard, stats, curRound, rounds,
    } = this.state;
    const newProgress = (curCard + 1) * 10;

    if (answer) {
      const { score, guessedWords } = stats;
      await this.setState({
        stats: {
          showStats: false,
          round: curRound + 1,
          score: score + 1,
          guessedWords: [
            ...guessedWords, rounds[curRound][curCard][0],
          ],
        },
      });
    }

    this.setState({
      progress: newProgress,
      curCard: curCard + 1,
    });

    if (newProgress === 100) {
      const newStats = this.state.stats;
      this.setState({ isUpdateCards: true });
      this.setState({ stats: { ...newStats, showStats: true } });
    } else {
      setTimeout(() => this.playAudio(), 600);
    }
  }

  nextRound = () => {
    setTimeout(() => {
      const { curRound, level } = this.state;
      this.setState({
        progress: 0,
        curRound: (curRound + 1) > 59 ? 0 : curRound + 1,
        level: (curRound + 1) > 59 ? level + 1 : level,
        curCard: 0,
        isUpdateCards: false,
      });
      setTimeout(() => this.playAudio(), 600);
    }, 600);
  }

  restartRound = () => {
    setTimeout(() => {
      const { curRound, level } = this.state;
      this.setState({
        progress: 0,
        curRound,
        level,
        curCard: 0,
        isUpdateCards: false,
      });
      setTimeout(() => this.playAudio(), 600);
    }, 600);
  }

  getRoundWords = () => {
    const {
      curRound, rounds,
    } = this.state;
    const curWords = rounds[curRound];
    return curWords.map((stage) => stage[0]);
  }

  closeModalStats = () => {
    this.setState({
      stats: {
        score: 0,
        guessedWords: [],
        round: 0,
        showStats: false,
      },
    });
  }

  handleLevelChange = async ({ target: { innerText } }) => {
    if (Number(innerText)) {
      this.setState({ isUpdateCards: true });
      this.getWords(Number(innerText));
      this.setState({
        level: Number(innerText),
        curCard: 0,
        curRound: 0,
        progress: 0,
      });
    }
  };

  handleRoundChange = ({ target: { innerText } }) => {
    if (Number(innerText)) {
      this.setState({ isUpdateCards: true });
      setTimeout(() => {
        this.setState({
          curRound: Number(innerText) - 1,
          curCard: 0,
          progress: 0,
          isUpdateCards: false,
        });
      }, 0);
      setTimeout(() => this.playAudio(), 600);
    }
  };

  moveToFirstRound = () => {
    this.setState({
      pages: Array.from({ length: 10 }, (x, i) => i + 1),
      curRound: 0,
      curCard: 0,
      progress: 0,
    });
    setTimeout(() => this.playAudio(), 600);
  }

  moveToRight = () => {
    const { curRound } = this.state;
    const newRound = Math.floor(curRound / 10 + 1) * 10;
    this.setState({
      pages: Array.from({ length: 10 }, (x, i) => i + newRound + 1),
      curRound: newRound,
      curCard: 0,
      progress: 0,
    });
    setTimeout(() => this.playAudio(), 600);
  }

  moveToLeft = () => {
    const { curRound } = this.state;
    const newRound = Math.floor(curRound / 10 - 1) * 10;
    this.setState({
      pages: Array.from({ length: 10 }, (x, i) => i + newRound + 1),
      curRound: newRound + 9,
      curCard: 0,
      progress: 0,
    });
    setTimeout(() => this.playAudio(), 600);
  }

  moveToLastRound = () => {
    this.setState({
      pages: Array.from({ length: 10 }, (x, i) => i + 50 + 1),
      curRound: 59,
    });
    setTimeout(() => this.playAudio(), 600);
  }

  render = () => (this.state.rounds.length > 0 ? (
    <Container fluid className="audiocall_wrap">
      <img className="audiocall_bg" src={BG} alt="Background" />
      <Row className="audiocall_header">
        <Col>
          <Col>
            <p>Level</p>
            <Pagination>
              {
                Array.from({ length: 6 }, (x, i) => i + 1).map((x) => (
                  <Pagination.Item
                    key={x}
                    active={x === (this.state.level)}
                    onClick={this.handleLevelChange}
                  >
                    {x}
                  </Pagination.Item>
                ))
              }
            </Pagination>
          </Col>
          <Col>
            <p>Round</p>
            <Pagination>
              <Pagination.First
                onClick={this.moveToFirstRound}
                disabled={this.state.curRound === 0}
              />
              <Pagination.Prev
                onClick={this.moveToLeft}
                disabled={this.state.curRound < 10}
              />
              {
                this.state.pages.map((x) => (
                  <Pagination.Item
                    key={x}
                    active={x === this.state.curRound + 1}
                    onClick={this.handleRoundChange}
                  >
                    {x}
                  </Pagination.Item>
                ))
              }
              <Pagination.Next
                onClick={this.moveToRight}
                disabled={this.state.curRound > 49}
              />
              <Pagination.Last
                onClick={this.moveToLastRound}
                disabled={this.state.curRound === 59}
              />
            </Pagination>
          </Col>
        </Col>
        <Col className="header_progress-bar">
          <p>
            {`Stage - ${this.state.curCard}/10`}
          </p>
          <ProgressBar animated now={this.state.progress} />
        </Col>
      </Row>
      <Row>
        <Col className="game_cards">
          {
            this.state.isUpdateCards
              ? (
                <Spinner animation="border" variant="primary" />
              )
              : (
                <Carousel
                  activeIndex={this.state.curCard}
                  controls={false}
                  indicators={false}
                  interval={null}
                  keyboard={null}
                  touch={false}
                >
                  {
                    this.state.rounds[this.state.curRound].map((stage, i) => (
                      <Carousel.Item key={`${this.state.curRound}_${stage[0].id}`}>
                        <GameCard
                          key={stage[0].id}
                          stage={stage}
                          cardNumber={i}
                          activeCard={this.activeCard}
                          nextCard={this.nextCard}
                          repeatAudio={this.repeatAudio}
                          logStats={this.logStats}
                        />
                      </Carousel.Item>
                    ))
                  }
                </Carousel>
              )
          }
        </Col>
      </Row>
      <Row className="game-footer">
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Volume</Form.Label>
            <Form.Control type="range" onChange={this.changeVolume} min={0} max={20} />
          </Form.Group>
        </Form>
        <HelpModal messages={AUDIOCALL_HELP} />
      </Row>
      <StatsModal
        stats={this.state.stats}
        closeModalStats={this.closeModalStats}
        nextRound={this.nextRound}
        restartRound={this.restartRound}
        allWords={this.getRoundWords()}
      />
    </Container>
  )
    : (
      <Container fluid className="audiocall_wrap">
        <Spinner animation="border" variant="primary" />
      </Container>
    ))
}

export default AudioCall;
