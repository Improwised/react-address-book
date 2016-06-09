import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/home';
import App from './components/app';
import Addaddress from './components/addaddress';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/add-address" component={Addaddress}/>
    <Route path="/edit-address/:id" component={Addaddress}/>
  </Route>
);

export default routes;
