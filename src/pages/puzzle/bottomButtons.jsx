import React from 'react';
import PropTypes from 'prop-types';

class BottomButtons extends React.Component {
  render() {
    return (
      <div className="bottom-buttons-wrapper">
        {this.props.allInSelected && !this.props.win && this.props.buttons && !this.props.next
          && (
          <button
            className="btn-small waves-effect waves-light red check"
            onClick={() => this.props.setCheck(true)}
          >
            check
          </button>
          )}
        {!this.props.win && this.props.buttons && !this.props.next
          && (
          <button
            className="btn-small waves-effect waves-light orange check"
            onClick={() => {
              this.props.setDontKnow(true);
              this.props.setCheck(true);
            }}
          >
            i dont know
          </button>
          )}
        {this.props.win && this.props.buttons && !this.props.next
          && (
          <button
            className="btn-small waves-effect waves-light blue check"
            onClick={() => {
              this.props.setDontKnow(false);
              this.props.setCheck(false);
              this.props.setContinue(true);
            }}
          >
            continue
          </button>
          )}
        {this.props.next
          && (
          <div>
            <button
              className="btn-small waves-effect waves-light pink check"
              onClick={() => {
                this.props.setNext(false);
              }}
            >
              continue
            </button>
            <a
              className="waves-effect waves-light btn-small orange modal-trigger statistic-trigger"
              href="#modal1"
            >
              statistic
            </a>
          </div>
          )}
      </div>

    );
  }
}

BottomButtons.propTypes = {
  allInSelected: PropTypes.bool.isRequired,
  setCheck: PropTypes.func.isRequired,
  setDontKnow: PropTypes.func.isRequired,
  win: PropTypes.bool.isRequired,
  setContinue: PropTypes.func.isRequired,
  buttons: PropTypes.bool.isRequired,
  setNext: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
};

export default BottomButtons;
