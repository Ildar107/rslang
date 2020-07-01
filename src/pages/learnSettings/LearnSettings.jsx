import React from 'react';
import {
  Row, Col, Card,
} from 'react-bootstrap';
// import StoreContext from '../../app/store';
import Skeleton from '../../components/skeleton/Skeleton';
import './learnSettings.scss';

const LearnSettings = () => (
  <Skeleton wrapperClass="learn-settings-page" title="Настройка обучения">
    <Row>
      <Col>
        <Card>
          <Card.Body />
        </Card>
      </Col>
    </Row>
  </Skeleton>
);

export default LearnSettings;
