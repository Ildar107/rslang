import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';

const TeamPage = () => (
  <Skeleton wrapperClass="main-page" title="О нас">
    <Row>
      <Col xl={6} lg={5}>
        O нас
      </Col>
    </Row>
  </Skeleton>
);

export default TeamPage;
