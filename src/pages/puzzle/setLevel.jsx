import React from 'react';
import PropTypes from 'prop-types';

class SetLevel extends React.Component {
  render() {
    const arr = new Array(30);
    const dropdownArr = arr.fill(0);
    const items = dropdownArr.map((it, num) => (
      <li>
        <a
          key={num + 1}
          href="#"
          onClick={(event) => {
            event.preventDefault();
            this.props.setPageNumber(num);
          }}
        >
          {num + 1}
        </a>
      </li>
    ));
    return (
      <div className="set-level">
        <a className="dropdown-trigger btn-small light-blue black-text lighten-5" href="#" data-target="dropdown1">
          ▼ level
          {`${this.props.difficulty + 1}`}
        </a>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a
              key={10}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(0);
              }}
            >
              1
            </a>
          </li>
          <li>
            <a
              key={20}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(1);
              }}
            >
              2
            </a>
          </li>
          <li>
            <a
              key={30}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(2);
              }}
            >
              3
            </a>
          </li>
          <li>
            <a
              key={40}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(3);
              }}
            >
              4
            </a>
          </li>
          <li>
            <a
              key={50}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(4);
              }}
            >
              5
            </a>
          </li>
          <li>
            <a
              key={60}
              href="#"
              onClick={(evet) => {
                evet.preventDefault();
                this.props.setDifficulty(5);
              }}
            >
              6
            </a>
          </li>
        </ul>
        <a className="dropdown-trigger btn-small light-green black-text lighten-5" href="#" data-target="dropdown2">
          ▼ page
          {`${this.props.pageNumber + 1}`}
        </a>
        <ul id="dropdown2" className="dropdown-content">
          {items}
        </ul>
        <button
          className="btn-small waves-effect go"
          onClick={() => {
            this.props.getWordsData(this.props.difficulty, this.props.pageNumber);
            this.props.setNext(false);
          }}
        >
          go!
        </button>
      </div>
    );
  }
}

SetLevel.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  getWordsData: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setNext: PropTypes.number.isRequired,
};

export default SetLevel;
