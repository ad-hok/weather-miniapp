import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import WeekWeather from './WeekWeather'
import WeekGraphicWeather from './WeekGraphicWeather'
import DayWeatherDetailed from './DayWeatherDetailed'

class Weather extends Component {
  render() {
    return (
      <div>
        <WeekWeather/>
        <Switch>
          <Route exact path="/" name="Week Graph" component={WeekGraphicWeather}/>
          <Route path="/:day" name="DayWeatherDetailed" component={DayWeatherDetailed}/>
        </Switch>
      </div>
    );
  }
}

export default Weather;
