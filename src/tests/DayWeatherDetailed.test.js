import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import DayWeatherDetailed from '../views/Weather/DayWeatherDetailed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route path="/:day" name="DayWeatherDetailed" render={ props => (
          <DayWeatherDetailed {...props} days={days}/>
        )}/>
      </Switch>
    </HashRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
