import React from 'react';
import ReactDOM from 'react-dom';
import 'nes.css/css/nes.min.css';
import './index.scss';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
