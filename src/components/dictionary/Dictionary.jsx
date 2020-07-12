import React, { Component } from 'react';
import {
  MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon,
} from 'mdbreact';
import {
  Container,
  Spinner,
} from 'react-bootstrap';
import LearnTable from './LearnTable/LearnTable';
import DeleteTable from './DeleteTable/DeleteTeble';
import DifficultTable from './DifficultTable/DifficultTable';
import './dictionary.scss';

class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItemJustified: '1',
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('JWT');
    fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=3600&filter=%7B%22%24or%22%3A%5B%7B%22userWord.optional.isRepeat%22%3Afalse%7D%2C%7B%22userWord.optional.isRepeat%22%3Atrue%7D%5D%7D`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.processedWords(data[0].paginatedResults);
      });
  }

  processedWords = (words) => {
    const learnWords = words?.filter(
      (w) => w.userWord.optional.isDelete !== true && w.userWord.optional.isDifficult !== true,
    );
    const deletedWords = words.filter((w) => w.userWord.optional.isDelete === true);
    const difficultWords = words.filter((w) => w.userWord.optional.isDifficult === true);

    this.setState({ deletedWords, difficultWords, learnWords });
  }

  sendUpdateWord = (word, action) => {
    const actionWord = word;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('JWT');
    switch (action) {
      case 'delete':
        actionWord.userWord.optional.isDelete = true;
        break;
      case 'difficult':
        actionWord.userWord.optional.isDifficult = true;
        break;
      default:
        actionWord.userWord.optional.isDelete = false;
        actionWord.userWord.optional.isDifficult = false;
        break;
    }
    fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${actionWord._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  restoreWord = (word) => {
    if (word.userWord.optional.isDelete) {
      const { learnWords, deleteWords } = this.state;
      const newDeleteWords = deleteWords.filter((w) => w._id !== word._id);
      const newLearnWords = learnWords.push(word);
      this.setState({ learnWords: newLearnWords, deleteWords: newDeleteWords });
    } else if (word.userWord.optional.isDifficult) {
      const { learnWords, difficultWords } = this.state;
      const newDifficultWords = difficultWords.filter((w) => w._id !== word._id);
      const newLearnWords = learnWords.push(word);
      this.setState({ learnWords: newLearnWords, difficultWords: newDifficultWords });
    }
  }

  deleteWord = (word) => {
    const { learnWords, deleteWords } = this.state;
    const newLearnWords = learnWords.filter((w) => w._id !== word._id);
    const newDeleteWords = deleteWords.push(word);
    this.setState({ learnWords: newLearnWords, deleteWords: newDeleteWords });
  }

  difficultWord = (word) => {
    const { learnWords, difficultWords } = this.state;
    const newLearnWords = learnWords.filter((w) => w._id !== word._id);
    const newDifficultWords = difficultWords.push(word);
    this.setState({ learnWords: newLearnWords, difficultWords: newDifficultWords });
  }

  toggleJustified = (tab) => () => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab,
      });
    }
  };

  render() {
    return this.state.learnWords ? (
      <MDBContainer className="dictionary-page">
        <MDBNav tabs className="nav-justified" color="indigo">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '1'} onClick={this.toggleJustified('1')} role="tab">
              <MDBIcon icon="graduation-cap" />
              {' '}
              Learn Words
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '2'} onClick={this.toggleJustified('2')} role="tab">
              <MDBIcon icon="exclamation-circle" />
              {' '}
              Difficult Words
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '3'} onClick={this.toggleJustified('3')} role="tab">
              <MDBIcon icon="ban" />
              {' '}
              Deleted Words
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={this.state.activeItemJustified}
        >
          <MDBTabPane tabId="1" role="tabpanel">
            <LearnTable words={this.state.learnWords} />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <DifficultTable words={this.state.difficultWords} />
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <DeleteTable words={this.state.deletedWords} />
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    ) : (
      <Container fluid className="audiocall_wrap">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
}

export default Dictionary;
