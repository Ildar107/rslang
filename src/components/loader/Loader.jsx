import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <Spinner animation="grow" role="status">
    <span className="sr-only">Загрузка...</span>
  </Spinner>
);

export default Loader;
