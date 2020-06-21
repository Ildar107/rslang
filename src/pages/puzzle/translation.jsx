import React from 'react'
import PropTypes from 'prop-types'

class Translation extends React.Component {
  render() {
    return (
        <div className='center-align translation'>
          {this.props.translation}
        </div>
    )
  }
}

Translation.propTypes = {
  translation: PropTypes.string
}

export default Translation
