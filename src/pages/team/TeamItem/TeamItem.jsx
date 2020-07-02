import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './team-item.scss';
import TeamModal from '../TeamModal/TeamModal';

class TeamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  onHide = () => {
    this.setState({
      showModal: false,
    });
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <>
        <Card className="team__card">
          <div
            style={{
              backgroundImage: `url(${this.props.info.photo})`,
            }}
            className="card__img"
          />
          <Card.Body>
            <Card.Title>
              {this.props.info.firstname}
              {' '}
              {this.props.info.lastname}
            </Card.Title>
            <Card.Text>
              {this.props.info.role}
            </Card.Text>
            <Button onClick={this.showModal} className="card__button" variant="secondary">Выполненные работы</Button>
          </Card.Body>
          <Card.Footer className="card__footer">
            <a className="card__social-link" href="#">
              <i className=" card__social-icon fab fa-github" aria-hidden="true" />
              {' '}
            </a>
            <a className="card__social-link" href="#">
              <i className=" card__social-icon fab fa-telegram-plane" aria-hidden="true" />
              {' '}
            </a>
            <a className="card__social-link" href="#">
              <i className=" card__social-icon fab fa-linkedin" aria-hidden="true" />
              {' '}
            </a>
            <a className="card__social-link" href="#">
              <i className=" card__social-icon fab fa-google" aria-hidden="true" />
              {' '}
            </a>
          </Card.Footer>
          <TeamModal
            onHide={this.onHide}
            show={this.state.showModal}
            works={this.props.info.works}
          />
        </Card>
      </>
    );
  }
}

export default TeamItem;
