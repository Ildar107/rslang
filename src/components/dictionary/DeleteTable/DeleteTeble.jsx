import React from 'react';
import { MDBDataTable } from 'mdbreact';
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
  ],
  rows: null,
};

class DeleteTable extends React.Component {
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
    const deleteWords = words.map((w) => {
      const {
        word, wordTranslate, textExample,
      } = w;
      return {
        word, wordTranslate, textExample,
      };
    });
    if (deleteWords && deleteWords.length > 0) {
      dataColumns.rows = deleteWords;
      this.setState({ data: dataColumns });
    }
    this.setState({ isGenerated: true });
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

export default DeleteTable;
