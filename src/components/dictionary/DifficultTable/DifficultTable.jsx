import React from 'react';
import { MDBDataTable } from 'mdbreact';

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
  ],
  rows: null,
};

class DifficultTable extends React.Component {
  constructor(props) {
    super(props);

    this.generatedData(this.props.words);

    this.state = {
      data: dataColumns,
    };
  }

  generatedData = (words) => {
    const difficultWords = words.map((w) => {
      const {
        word, wordTranslate, textExample,
      } = w;
      return {
        word, wordTranslate, textExample,
      };
    });
    if (difficultWords && difficultWords.length > 0) {
      dataColumns.rows = difficultWords;
      this.setState({ data: dataColumns });
    }
  }

  render() {
    return (
      <MDBDataTable
        striped
        bordered
        sortable
        data={this.state.data}
      />
    );
  }
}

export default DifficultTable;
