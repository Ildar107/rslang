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
  rows: [],
};

class LearnTable extends React.Component {
  constructor(props) {
    super(props);

    this.generatedData(this.props.words);

    this.state = {
      data: dataColumns,
    };
  }

  generatedData = (words) => {
    const learnWords = words.map((w) => {
      const {
        word, wordTranslate, textExample,
      } = w;
      return {
        word, wordTranslate, textExample,
      };
    });
    if (learnWords && learnWords.length > 0) {
      dataColumns.rows = learnWords;
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

export default LearnTable;
