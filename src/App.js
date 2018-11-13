import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import WeekWeather from './views/Weather/WeekWeather'
import WeekGraphicWeather from './views/Weather/WeekGraphicWeather'
import DayWeatherDetailed from './views/Weather/DayWeatherDetailed'

class App extends Component {
  render() {
    return (
      <div>
        <WeekWeather/>
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Week Graph" component={WeekGraphicWeather}/>
            <Route path="/:day" name="DayWeatherDetailed" component={DayWeatherDetailed}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
