import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const BottomButtons = (props) => (
  <div>
    {props.allInSelected && !props.win && props.buttons && !props.next
          && (
          <Button
            size="sm"
            className="puzzle-red-btn"
            onClick={() => props.setCheck(true)}
          >
            CHECK
          </Button>
          )}

    {!props.win && props.buttons && !props.next
          && (
          <Button
            size="sm"
            className="puzzle-orange-btn"
            onClick={() => {
              props.setDontKnow(true);
              props.setCheck(true);
            }}
          >
            I DONT KNOW
          </Button>
          )}
    {props.win && props.buttons && !props.next
          && (
          <Button
            size="sm"
            className="puzzle-blue-btn"
            onClick={() => {
              props.setDontKnow(false);
              props.setCheck(false);
              props.setContinue(true);
            }}
          >
            CONTINUE
          </Button>
          )}
    {props.next
          && (
          <>
            <Button
              size="sm"
              className="puzzle-pink-btn"
              onClick={() => {
                props.setNext(false);
              }}
            >
              CONTINUE
            </Button>
            <Button
              onClick={() => props.setStatisticModalShow(true)}
              size="sm"
              className="puzzle-orange-btn"
            >
              STATISTIC
            </Button>
          </>
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
