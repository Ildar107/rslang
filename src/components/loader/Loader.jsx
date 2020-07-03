import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loader.scss';

const Loader = () => (
  <div className="loader__container">
    <div className="loader">
      <Spinner animation="grow  text-primary" role="status">
        <span className="sr-only">Загрузка...</span>
      </Spinner>
    </div>
  </div>
);

export default Loader;
