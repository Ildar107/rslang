import React from 'react';
import { Card } from 'react-bootstrap';

const Tilebox = (props) => (
  <Card className="tilebox-one">
    <Card.Body>
      <i className={`uil ${props.icon} float-right`} />
      <h6 className="text-uppercase mt-0">{props.title}</h6>
      <h2 className="my-2" id="active-users-count">{props.value}</h2>
      <p className="mb-0 text-muted">
        <span className={`${props.isUp ? 'text-success' : 'text-danger'} mr-2`}>
          <span className={`${props.isUp ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'} mdi `} />
          {' '}
          {props.updateValue}
        </span>
        <span className="text-nowrap" />
      </p>
    </Card.Body>
  </Card>
);

export default Tilebox;
