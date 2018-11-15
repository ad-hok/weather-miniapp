import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Weather from '../views/Weather/Weather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route path="/" name="Weather" component={Weather}/>
      </Switch>
    </HashRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
