import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './router';

const initRouter = () => {
  ReactDOM.render(<Router history={hashHistory} routes={routes} />
    , document.getElementById('app'));
};

initRouter();
