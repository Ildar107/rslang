/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import {
  MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn,
} from 'mdbreact';
import {
  Container,
  Spinner,
  Image,
} from 'react-bootstrap';
import LearnTable from './LearnTable/LearnTable';
import DeleteTable from './DeleteTable/DeleteTeble';
import DifficultTable from './DifficultTable/DifficultTable';
import './dictionary.scss';
import Voice from '../../assets/images/voice.svg';
import StoreContext from '../../app/store';

const mediaUrl = 'https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/master/';

class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItemJustified: '1',
    };
  }

  static learnDataColumns;

  static diffDataColumns;

  static contextType = StoreContext;

  componentDidMount() {
    const { userSettings } = this.context;
    const {
      example, transcription, translate, wordImg, explain,
    } = userSettings;
    this.learnDataColumns = [
      {
        label: 'Audio',
        field: 'audio',
        sort: 'disabled',
        width: 30,
      },
      wordImg ? {
        label: 'Image',
        field: 'image',
        sort: 'disabled',
        width: 150,
      } : '',
      {
        label: 'Word',
        field: 'word',
        sort: 'asc',
        width: 200,
      },
      translate ? {
        label: 'Translate',
        field: 'wordTranslate',
        sort: 'asc',
        width: 200,
      } : '',
      transcription ? {
        label: 'Transcript',
        field: 'transcription',
        sort: 'asc',
        width: 250,
      } : '',
      explain ? {
        label: 'Meaning',
        field: 'textMeaning',
        sort: 'asc',
        width: 400,
      } : '',
      example ? {
        label: 'Example',
        field: 'textExample',
        sort: 'asc',
        width: 400,
      } : '',
      {
        label: 'Difficult',
        field: 'difficultWord',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Delete',
        field: 'deleteWord',
        sort: 'disabled',
        width: 150,
      },
    ];

    this.diffDataColumns = [
      {
        label: 'Audio',
        field: 'audio',
        sort: 'disabled',
        width: 30,
      },
      wordImg ? {
        label: 'Image',
        field: 'image',
        sort: 'disabled',
        width: 150,
      } : '',
      {
        label: 'Word',
        field: 'word',
        sort: 'asc',
        width: 200,
      },
      translate ? {
        label: 'Translate',
        field: 'wordTranslate',
        sort: 'asc',
        width: 200,
      } : '',
      transcription ? {
        label: 'Transcript',
        field: 'transcription',
        sort: 'asc',
        width: 250,
      } : '',
      explain ? {
        label: 'Meaning',
        field: 'textMeaning',
        sort: 'asc',
        width: 400,
      } : '',
      example ? {
        label: 'Example',
        field: 'textExample',
        sort: 'asc',
        width: 400,
      } : '',
      {
        label: 'Restore',
        field: 'restoreWord',
        sort: 'disabled',
        width: 150,
      },
    ];

    this.learnDataColumns = this.learnDataColumns.filter((c) => c !== '');
    this.diffDataColumns = this.diffDataColumns.filter((c) => c !== '');

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

  toggleJustified = (tab) => () => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab,
      });
    }
  };

  processedWords = (words) => {
    const learnWords = words?.filter(
      (w) => w.userWord.optional.isDelete !== true && w.userWord.optional.isDifficult !== true,
    );
    const learnData = this.generateLearnData(learnWords);

    const deleteWords = words.filter((w) => w.userWord.optional.isDelete === true);
    const deleteData = this.generateOtherData(deleteWords);

    const difficultWords = words.filter((w) => w.userWord.optional.isDifficult === true);
    const diffData = this.generateOtherData(difficultWords);

    this.setState({
      deleteWords, deleteData, diffData, learnWords, difficultWords, learnData,
    });
  }

  updateWord = (word, action) => {
    const { userWord } = word;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('JWT');
    let newOptional;
    switch (action) {
      case 'delete':
        newOptional = { ...userWord.optional, isDelete: true };
        break;
      case 'difficult':
        newOptional = { ...userWord.optional, isDifficult: true };
        break;
      default:
        newOptional = { ...userWord.optional, isDifficult: false, isDelete: false };
        break;
    }
    fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${word._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: 'string',
        optional: { ...newOptional },
      }),
    });
    return newOptional;
  }

  // eslint-disable-next-line consistent-return
  restoreWord = (word) => {
    if (word?.userWord.optional.isDelete) {
      const { learnWords, deleteWords } = this.state;

      const newDeleteWords = deleteWords.filter((w) => w._id !== word._id);
      const deleteData = this.generateOtherData(newDeleteWords);

      const newOptional = this.updateWord(word);
      const newLearnWords = [
        { ...word, userWord: { ...word.userWord, optional: { ...newOptional } } }, ...learnWords,
      ];
      const learnData = this.generateLearnData(newLearnWords);

      this.setState({
        learnWords: newLearnWords, deleteWords: newDeleteWords, learnData, deleteData,
      });
    } else if (word?.userWord.optional.isDifficult) {
      const { learnWords, difficultWords } = this.state;

      const newDifficultWords = difficultWords.filter((w) => w._id !== word._id);
      const diffData = this.generateOtherData(newDifficultWords);

      const newOptional = this.updateWord(word);
      const newLearnWords = [
        { ...word, userWord: { ...word.userWord, optional: { ...newOptional } } }, ...learnWords,
      ];
      const learnData = this.generateLearnData(newLearnWords);

      this.setState({
        learnWords: newLearnWords, difficultWords: newDifficultWords, learnData, diffData,
      });
    }
  }

  deleteWord = (word) => {
    const { learnWords, deleteWords } = this.state;

    const newLearnWords = learnWords.filter((w) => w._id !== word._id);
    const learnData = this.generateLearnData(newLearnWords);

    const newOptional = this.updateWord(word, 'delete');
    const newDeleteWords = [
      { ...word, userWord: { ...word.userWord, optional: { ...newOptional } } }, ...deleteWords,
    ];
    const deleteData = this.generateOtherData(newDeleteWords);

    this.setState({
      learnWords: newLearnWords, deleteWords: newDeleteWords, learnData, deleteData,
    });
  }

  difficultWord = (word) => {
    const { learnWords, difficultWords } = this.state;

    const newLearnWords = learnWords.filter((w) => w._id !== word._id);
    const learnData = this.generateLearnData(newLearnWords);

    const newOptional = this.updateWord(word, 'difficult');
    const newDifficultWords = [
      { ...word, userWord: { ...word.userWord, optional: { ...newOptional } } }, ...difficultWords,
    ];
    const diffData = this.generateOtherData(newDifficultWords);

    this.setState({
      learnWords: newLearnWords, difficultWords: newDifficultWords, learnData, diffData,
    });
  }

  onPlay = (e) => {
    const audio = new Audio(e.target.alt);
    audio.play();
  }

  generateLearnData = (words) => {
    const learnWords = words.map((w) => {
      const {
        word, wordTranslate, textExample, transcription, textMeaning, audio, image,
      } = w;
      const clearExample = textExample.replace(/<\/?[^>]+(>|$)/g, '');
      const clearMeaning = textMeaning.replace(/<\/?[^>]+(>|$)/g, '');
      return {
        audio: <Image width={30} onClick={this.onPlay} src={Voice} alt={mediaUrl + audio} className="repeat_voice" />,
        image: <Image src={mediaUrl + image} alt={word} className="meaning_image" />,
        word,
        wordTranslate,
        transcription,
        textExample: clearExample,
        textMeaning: clearMeaning,
        difficultWord: <MDBBtn color="purple" id={`dif_${w._id}`} onClick={this.onDifficult} size="sm">Difficult</MDBBtn>,
        deleteWord: <MDBBtn color="purple" id={`del_${w._id}`} onClick={this.onDelete} size="sm">Delete</MDBBtn>,
      };
    });
    return {
      columns: this.learnDataColumns,
      rows: learnWords,
    };
  }

  generateOtherData = (words) => {
    const otherWords = words.map((w) => {
      const {
        word, wordTranslate, textExample, transcription, textMeaning, audio, image,
      } = w;
      const clearExample = textExample.replace(/<\/?[^>]+(>|$)/g, '');
      const clearMeaning = textMeaning.replace(/<\/?[^>]+(>|$)/g, '');
      return {
        audio: <Image width={30} onClick={this.onPlay} src={Voice} alt={mediaUrl + audio} className="repeat_voice" />,
        image: <Image src={mediaUrl + image} alt={word} className="meaning_image" />,
        word,
        wordTranslate,
        transcription,
        textExample: clearExample,
        textMeaning: clearMeaning,
        restoreWord: <MDBBtn color="purple" id={`${w.userWord.optional.isDelete ? 'delete' : 'difficult'}_${w._id}`} onClick={this.onRestore} size="sm">Restore</MDBBtn>,
      };
    });
    return {
      columns: this.diffDataColumns,
      rows: otherWords,
    };
  }

  onRestore = (e) => {
    const restoreFrom = e.target.id.split('_')[0];
    const wordId = e.target.id.split('_')[1];
    if (restoreFrom === 'difficult') {
      const word = this.state.difficultWords.find((w) => w._id === wordId);
      this.restoreWord(word);
    } else {
      const word = this.state.deleteWords.find((w) => w._id === wordId);
      this.restoreWord(word);
    }
  }

  onDifficult = (e) => {
    const wordId = e.target.id.split('_')[1];
    const word = this.state.learnWords.find((w) => w._id === wordId);
    this.difficultWord(word);
  }

  onDelete = (e) => {
    const wordId = e.target.id.split('_')[1];
    const word = this.state.learnWords.find((w) => w._id === wordId);
    this.deleteWord(word);
  }

  render() {
    return this.state.diffData ? (
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
            <LearnTable
              data={this.state.learnData}
            />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <DifficultTable
              data={this.state.diffData}
            />
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <DeleteTable
              data={this.state.deleteData}
            />
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
