import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './router';

require('style!css!bootstrap/dist/css/bootstrap.css');
require('style!css!font-awesome/css/font-awesome.css');
require('../assets/css/index.css');
require('../assets/js/time.js');

const initRouter = () => {
  ReactDOM.render(<Router history={hashHistory} routes={routes} />
    , document.getElementById('app'));
};

initRouter();
