import React from 'react';
import { MDBDataTable } from 'mdbreact';

class DeleteTable extends React.Component {
  render() {
    return (
      <MDBDataTable
        striped
        bordered
        responsive
        sortable
        data={this.props.data}
      />
    );
  }
}

export default DeleteTable;
