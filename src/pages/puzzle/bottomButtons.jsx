import React from 'react';
import PropTypes from 'prop-types';


const BottomButtons = (props) => (
  <div className="bottom-buttons-wrapper">
    {props.allInSelected && !props.win && props.buttons && !props.next
          && (
          <button
            className="btn-small waves-effect waves-light red check"
            onClick={() => props.setCheck(true)}
          >
            check
          </button>
          )}

    {!props.win && props.buttons && !props.next
          && (
          <button
            className="btn-small waves-effect waves-light orange check"
            onClick={() => {
              props.setDontKnow(true);
              props.setCheck(true);
            }}
          >
            i dont know
          </button>
          )}
    {props.win && props.buttons && !props.next
          && (
          <button
            className="btn-small waves-effect waves-light blue check"
            onClick={() => {
              props.setDontKnow(false);
              props.setCheck(false);
              props.setContinue(true);
            }}
          >
            continue
          </button>
          )}
    {props.next
          && (
          <button
            className="btn-small waves-effect waves-light pink check"
            onClick={() => {
              props.setNext(false);
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
          )}
  </div>

);

BottomButtons.propTypes = {
  allInSelected: PropTypes.bool,
  setCheck: PropTypes.func,
  setDontKnow: PropTypes.func,
  win: PropTypes.bool,
  setContinue: PropTypes.func,
  buttons: PropTypes.bool,
  setNext: PropTypes.func,
  next: PropTypes.bool,
};

BottomButtons.defaultProps = {
  allInSelected: false,
  setCheck: () => {},
  setDontKnow: () => {},
  win: false,
  setContinue: () => {},
  buttons: false,
  setNext: () => {},
  next: false,
};

export default BottomButtons;
