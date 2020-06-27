/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Card } from 'react-bootstrap';

const TeamPage = (props) => (
  <>
    <Card>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>
          {props.firstname}
          {' '}
          {props.lastname}
        </Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <a href="#">GitHub</a>
        <a href="#">CodeWars</a>
        <a href="#">Google</a>
      </Card.Footer>
    </Card>
  </>
);

export default TeamPage;
