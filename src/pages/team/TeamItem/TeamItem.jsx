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
        <a className="card__social-link" href="#">
          <i className=" card__social-icon fab fa-github" aria-hidden="true" />
          {' '}
        </a>
        <a className="card__social-link" href="#">
          <i className=" card__social-icon fab fa-telegram-plane" aria-hidden="true" />
          {' '}
        </a>
        <a className="card__social-link" href="#">
          <i className=" card__social-icon fab fa-linkedin" aria-hidden="true" />
          {' '}
        </a>
        <a className="card__social-link" href="#">
          <i className=" card__social-icon fab fa-google" aria-hidden="true" />
          {' '}
        </a>
      </Card.Footer>
    </Card>
  </>
);

export default TeamItem;
