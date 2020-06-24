import React, { Component } from 'react';
import {
  Container,
  Row,
  ProgressBar,
  Col,
  Spinner,
  Carousel,
  Pagination,
} from 'react-bootstrap';
import GameCard from './GameCard/GameCard';
import BG from '../../assets/images/audiocall-bg.svg';
import './audiocall.scss';

import { chunk } from './GameLogic/processedWords';

const mediaUrl = 'https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/master/';

class AudioCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      rounds: [],
      curRound: 1,
      level: 1,
      curCard: 0,
    };
  }

  componentDidMount() {
    const { level } = this.state;
    fetch(`https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/groups/data/group${level}.json`)
      .then((res) => res.json())
      .then((data) => {
        const processedData = this.formatMedia(data);
        this.setState({
          // levelWords: processedData,
          rounds: chunk(processedData, 10),
        });
      });
  }

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

  shuffleRounds = (rounds) => rounds.sort(() => Math.random() - 0.5)

  nextCard = () => {
    const { curRound } = this.state;
    const newProgress = curRound * 10;
    this.setState({
      progress: newProgress,
      curRound: curRound + 1,
    });

    setTimeout(() => {
      if (newProgress === 100) {
        alert('Complete');
      }
    }, 600);
  }

  render() {
    return this.state.rounds.length > 0 ? (
      <Container fluid className="audiocall_wrap">
        <img className="audiocall_bg" src={BG} alt="Background" />
        <Row className="audiocall_header">
          <Col>
            <Col>
              <p>Level</p>
              <Pagination activeIndex={this.state.level}>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Item>{6}</Pagination.Item>
              </Pagination>
            </Col>
            <Col>
              <p>Round</p>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{60}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Col>
          </Col>
          <Col className="header_progress-bar">
            <p>
              {`Stage - ${this.state.curRound - 1}/10`}
            </p>
            <ProgressBar animated now={this.state.progress} />
          </Col>
        </Row>
        <Row>
          <Col className="game_cards">
            <Carousel
              activeIndex={this.state.curCard}
              controls={false}
              indicators={false}
              interval={null}
              keyboard={null}
              touch={false}
            >
              {
                this.state.rounds[this.state.curRound].map((stage) => (
                  <Carousel.Item key={`${this.state.curRound}_${stage[0].id}`}>
                    <GameCard
                      key={stage[0].id}
                      stage={stage}
                      nextCard={this.nextCard}
                    />
                  </Carousel.Item>
                ))
              }
            </Carousel>
          </Col>
        </Row>
      </Container>
    )
      : (
        <Container fluid className="audiocall_wrap">
          <Spinner animation="border" variant="primary" />
        </Container>
      );
  }
}

export default AudioCall;
