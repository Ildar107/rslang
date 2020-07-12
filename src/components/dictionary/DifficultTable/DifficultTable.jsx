import React from 'react';
import { MDBDataTable } from 'mdbreact';

class DifficultTable extends React.Component {
  render() {
    return (
      <MDBDataTable
        striped
        bordered
        sortable
        data={this.props.data}
      />
    );
  }
}

export default DifficultTable;
