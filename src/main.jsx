import 'bootswatch/dist/journal/bootstrap.min.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import routes from './constants/routes';
import './assets/styles/style.scss';
import './assets/styles/icons.min.css';

ReactDOM.render(
  <HashRouter basename={routes.LANDING}>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
