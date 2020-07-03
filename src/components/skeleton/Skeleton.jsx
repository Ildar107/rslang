import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import Header from '../header/Header';
import LeftSideMenu from '../leftSideMenu/LeftSideMenu';

const Skeleton = (props) => (
  <>
    <Header />
    <Container fluid className="mm-active">
      <div className="wrapper-page mm-show">
        <LeftSideMenu />
        <div className={`content-page ${props.wrapperClass}`}>
          <div className="content">
            <Row>
              <Col>
                <div className="page-title-box">
                  <h4 className="page-title">{props.title}</h4>
                </div>
              </Col>
            </Row>
            {props.children}
          </div>
        </div>
      </div>
    </Container>
  </>
);

export default Skeleton;
