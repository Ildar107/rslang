import React from 'react';
import { Card } from 'react-bootstrap';
import './team-item.scss';

const TeamItem = (props) => (
  <>
    <Card className="team__card">
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>
          {props.info.firstname}
          {' '}
          {props.info.lastname}
        </Card.Title>
        <Card.Text>
          {props.info.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="card__footer">
        <a>
          <i className="fa fa-phone" aria-hidden="true" />
          {' '}
        </a>
        <a>
          <i className="fa fa-phone" aria-hidden="true" />
          {' '}
        </a>
        <a>
          <i className="fa fa-phone" aria-hidden="true" />
          {' '}
        </a>
      </Card.Footer>
    </Card>
  </>
);

export default TeamItem;
