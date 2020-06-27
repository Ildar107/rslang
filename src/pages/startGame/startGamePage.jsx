import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';

function StartGamePage(props) {
  return (
    <>
      <Header />
      <Container>
        <span>{props.game}</span>
      </Container>
    </>
  );
}

StartGamePage.propTypes = {
  game: PropTypes.string.isRequired,
};

export default StartGamePage;
