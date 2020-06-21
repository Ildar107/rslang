/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Col,
} from 'react-bootstrap';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Col>
        <p>{this.props.word.wordTranslate}</p>
      </Col>
    );
  }
}

export default Word;
