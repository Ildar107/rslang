import React from 'react';
import PropTypes from 'prop-types';

class Translation extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.translation}</p>
      </div>
    );
  }
}

Translation.propTypes = {
  translation: PropTypes.string.isRequired,
};

export default Translation;
