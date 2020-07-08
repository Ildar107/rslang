import React from 'react';
import { MDBDataTable } from 'mdbreact';

const data = {
  columns: [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Position',
      field: 'position',
      sort: 'asc',
      width: 270,
    },
    {
      label: 'Office',
      field: 'office',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'Age',
      field: 'age',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Start date',
      field: 'date',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Salary',
      field: 'salary',
      sort: 'asc',
      width: 100,
    },
  ],
};

class LearnTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      learnWords: this.props.words,
    };
  }

  generatedData = (words) => {

  }

  render() {
    return (
      <MDBDataTable
        striped
        bordered
        sortable
        data={this.state.learnWords}
      />
    );
  }
}

export default LearnTable;
