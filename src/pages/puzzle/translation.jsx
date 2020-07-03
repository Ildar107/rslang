import React from 'react';
import PropTypes from 'prop-types';
// import StatisticModal from "./statisticModal";

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
  translation: PropTypes.string,
};

Translation.defaultProps = {
  translation: null,
};

export default Translation;
