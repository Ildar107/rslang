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
      width: 400,
    },
    {
      label: 'Restore',
      field: 'restoreWord',
      sort: 'disabled',
      width: 250,
    },
  ],
  rows: null,
};

class DifficultTable extends React.Component {
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
    const difficultWords = words.map((w) => {
      const {
        word, wordTranslate, textExample,
      } = w;
      const clearText = textExample.replace(/<\/?[^>]+(>|$)/g, '');
      return {
        word,
        wordTranslate,
        textExample: clearText,
        restoreWord: <MDBBtn color="purple" id={`res_${w._id}`} onClick={this.onRestore} size="sm">Restore</MDBBtn>,
      };
    });
    if (difficultWords && difficultWords.length > 0) {
      const newDataColumns = { ...dataColumns };
      newDataColumns.rows = difficultWords;
      this.setState({ data: newDataColumns });
    }
    this.setState({ isGenerated: true });
  }

  onRestore = (e) => {
    const wordId = e.target.id.split('_')[1];
    const word = this.props.words.find((w) => w._id === wordId);
    const updateWords = this.props.difficultWord(word);
    this.generatedData(updateWords);
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

export default DifficultTable;
