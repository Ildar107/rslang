import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'react-bootstrap';

class SetLevel extends React.Component {
  render() {
    const active = this.props.difficulty;
    const paginationItems = [];
    for (let number = 1; number <= 6; number += 1) {
      paginationItems.push(
        <Pagination.Item
          onClick={() => this.props.setDifficulty(number - 1)}
          key={number}
          active={number === active + 1}
        >
          {number}
        </Pagination.Item>,
      );
    }

    const activePage = this.props.pageNumber + 1;
    const paginationPageItems = [];
    if (activePage <= 2) {
      for (let number = 1; number <= 3; number += 1) {
        paginationPageItems.push(
          <Pagination.Item
            onClick={() => this.props.setPageNumber(number - 1)}
            key={number}
            active={number === activePage}
          >
            {number}
          </Pagination.Item>,
        );
      }
    }
    if (activePage >= 29) {
      for (let number = 28; number <= 30; number += 1) {
        paginationPageItems.push(
          <Pagination.Item
            onClick={() => this.props.setPageNumber(number - 1)}
            key={number}
            active={number === activePage}
          >
            {number}
          </Pagination.Item>,
        );
      }
    }
    if (activePage < 29 && activePage > 2) {
      for (let number = activePage - 1; number <= activePage + 1; number += 1) {
        paginationPageItems.push(
          <Pagination.Item
            onClick={() => this.props.setPageNumber(number - 1)}
            key={number}
            active={number === activePage}
          >
            {number}
          </Pagination.Item>,
        );
      }
    }

    return (
      <div className="puzzle-set-level">
        <div>
          <p>Level</p>
          <Pagination>{paginationItems}</Pagination>
        </div>
        <div>
          <p>Page</p>
          <Pagination>
            <Pagination.First
              onClick={() => this.props.setPageNumber(0)}
            />
            {paginationPageItems}
            <Pagination.Last
              onClick={() => this.props.setPageNumber(29)}
            />
          </Pagination>
        </div>
        <Button
          className="puzzle-go btn btn-info"
          onClick={() => {
            this.props.getWordsData(this.props.difficulty, this.props.pageNumber);
            this.props.setNext(false);
          }}
        >
          GO!
        </Button>
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
