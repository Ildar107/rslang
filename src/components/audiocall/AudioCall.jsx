/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Container, Row, ProgressBar, Button, Col, Spinner, Image,
} from 'react-bootstrap';
import Word from './word/Word';
import BG from '../../assets/images/audiocall-bg.svg';
import './audiocall.scss';

const mediaUrl = 'https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/master/';
const wordsDetailUrl = 'https://dictionary.skyeng.ru/api/public/v1/words/search';

class AudioCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      words: [],
      playWords: [],
    };
  }

  componentDidMount() {
    this.getWordsCollection();
  }

  getUrlsCollection = (groupNumber = 0) => {
    const urls = [];
    for (let i = 0; i < 30; i += 1) {
      urls.push(`https://afternoon-falls-25894.herokuapp.com/words?group=${groupNumber}&page=${i}`);
    }
    return urls;
  }

  sortAlphabetically = (arr) => arr.sort((a, b) => {
    const textA = a.word.toUpperCase();
    const textB = b.word.toUpperCase();
    if (textA < textB) {
      return -1;
    } if (textA > textB) {
      return 1;
    }
    return 0;
  })

  getWordsCollection = async (groupNumber = 0) => {
    const urls = this.getUrlsCollection(groupNumber);
    Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then((data) => {
      const arrData = this.sortAlphabetically(data.flat(1));
      this.getAllWordsDetail(arrData);
    });
  }

  getAllWordsDetail = (words) => {
    Promise.all(words.map((word) => fetch(`${wordsDetailUrl}?search=${word.word}&page=1&pageSize=5`).then((resp) => resp.json()))).then((data) => {
      this.updateWordsDetails(words, data);
    });
  }

  updateWordsDetails = (words, details) => {
    // console.log(words, details);
    const newWords = words.map((word, i) => this.compareWordsDetails(word, details[i]));

    console.log(newWords);
  }

  compareWordsDetails = (word, details) => {
    const wordDetails = details.find((item) => item.text === word.word) || details[0];
    word.partOfSpeech = wordDetails.meanings[0].partOfSpeechCode;
    return word;
  }

  formatMedia = (data) => {
    const newData = data.map((word) => {
      word.image = mediaUrl + word.image;
      word.audio = mediaUrl + word.audio;
      return word;
    });
    return newData;
  }

  getRandomLetter = () => {
    const randomChars = 'abcdefghijklmnopqrstuvwxyz';
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  getRandomPage = () => Math.round(Math.random() * 29 + 1)

  getRandomPlayWords = (length) => {
    const randomIdx = [];
    for (let i = 0; i < 6; i += 1) {
      randomIdx.push((Math.floor(Math.random() * length)));
    }
    return randomIdx;
  }

  getPlayWords = () => {
    const { words } = this.state;
    const letter = this.getRandomLetter();

    console.log(words);

    const curPlayWords = words.filter((word) => word.word[0] === letter);

    console.log(curPlayWords);

    if (curPlayWords.length >= 6) {
      const randomIdx = this.getRandomPlayWords(curPlayWords.length);
      const playWords = curPlayWords.filter((word, i) => randomIdx.includes(i));
      const curWord = playWords.shift();
      return this.setState({ playWords, curWord });
    }

    return true;
  }

  clickHandler = () => {
    const { progress } = this.state;
    const newProgress = progress + 10;
    this.setState({ progress: newProgress });
    setTimeout(() => {
      if (newProgress === 100) {
        alert('Complete');
      }
    }, 600);
  }

  render() {
    return this.state.words.length > 0 && this.state.playWords.length > 0 ? (
      <Container fluid className="audiocall_wrap">
        <img className="audiocall_bg" src={BG} alt="Background" />
        <Row className="header_progress-bar">
          <ProgressBar animated now={this.state.progress} />
        </Row>
        <Row>
          <Col>
            <Button onClick={this.clickHandler}>Click me</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={this.state.curWord.image} width={50} height={50} roundedCircle />
          </Col>
        </Row>
        <Row>
          {this.state.playWords.map((word) => (<Word key={word.id} word={word} />))}
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
