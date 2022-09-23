import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { MegaParent } from './sockets';

import './style.css';

// this MegaParent wrap is done so that all the variables of sockets file are global to every component via UseContext

ReactDOM.render(
  <MegaParent>
    <App />
  </MegaParent>,
  document.getElementById('root'),
);