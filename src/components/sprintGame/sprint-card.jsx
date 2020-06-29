/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class SprintCard extends Component {
  render() {
    return (
      <div className="card__content">
        <div className="sprint__doubling">х1</div>
        <div className="card__word">Слово</div>
        <div className="card__translate">Перевод</div>
      </div>
    );
  }
}

export default SprintCard;
