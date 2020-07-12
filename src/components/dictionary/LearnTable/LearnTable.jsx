import React from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import {
  Container,
  Spinner,
} from 'react-bootstrap';

const dataColumns = {
  columns: [
    {
      label: 'Word',
      field: 'word',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'Translate',
      field: 'wordTranslate',
      sort: 'asc',
      width: 270,
    },
    {
      label: 'Text Example',
      field: 'textExample',
      sort: 'asc',
      width: 350,
    },
    {
      label: 'Difficult',
      field: 'difficultWord',
      sort: 'disabled',
      width: 250,
    },
    {
      label: 'Delete',
      field: 'deleteWord',
      sort: 'disabled',
      width: 250,
    },
  ],
  rows: null,
};

class LearnTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: dataColumns,
      isGenerated: false,
    };
  }

  componentDidMount() {
    this.generatedData(this.props.words);
  }

  generatedData = (words) => {
    const learnWords = words.map((w) => {
      const {
        word, wordTranslate, textExample,
      } = w;
      const clearText = textExample.replace(/<\/?[^>]+(>|$)/g, '');
      return {
        word,
        wordTranslate,
        textExample: clearText,
        difficultWord: <MDBBtn color="purple" id={`dif_${w._id}`} onClick={this.onDifficult} size="sm">Difficult</MDBBtn>,
        deleteWord: <MDBBtn color="purple" id={`del_${w._id}`} onClick={this.onDelete} size="sm">Delete</MDBBtn>,
      };
    });
    if (learnWords && learnWords.length > 0) {
      const newDataColumns = { ...dataColumns };
      newDataColumns.rows = learnWords;
      this.setState({ data: newDataColumns });
    }
    this.setState({ isGenerated: true });
  }

  onDifficult = (e) => {
    const wordId = e.target.id.split('_')[1];
    const word = this.props.words.find((w) => w._id === wordId);
    const updateWords = this.props.difficultWord(word);
    this.generatedData(updateWords);
  }

  onDelete = (e) => {
    const wordId = e.target.id.split('_')[1];
    const word = this.props.words.find((w) => w._id === wordId);
    this.props.deleteWord(word);
  }

  render() {
    return this.state.isGenerated ? (
      <MDBDataTable
        striped
        bordered
        sortable
        data={this.state.data}
      />
    ) : (
      <Container fluid className="audiocall_wrap">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
}

export default LearnTable;
