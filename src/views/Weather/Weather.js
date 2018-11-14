import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment';
import { getWeekWeather } from '../../api/Weather/weather';

import WeekWeather from './WeekWeather'
import WeekGraphicWeather from './WeekGraphicWeather'
import DayWeatherDetailed from './DayWeatherDetailed'

class Weather extends Component {
  constructor(){
    super();
    this.state = {
      days: [],
      city: null
    }
  }

  async componentDidMount(){
    try {
      let res = await getWeekWeather();
      this._getDays(res.data.list);
      this._getCityInfo(res.data.city);
    } catch (e) {
      //manejar el error
    }
  }

  _getDays(list){
    const days = []
    const today = moment().format('YYYY-MM-DD');
    list.forEach( d => {
      const day = moment(d.dt_txt).format('YYYY-MM-DD');
      const dayName = moment(d.dt_txt).format('ddd');
      const i = moment(day).diff(today, 'days');
      if( !days[i] ) days[i] = [];
      days[i].push({...d, dayName});
    });
    this.setState({
      days
    });
  }

  _getCityInfo(city){
    this.setState({
      city
    });
  }

  render() {
    const { days, city} = this.state;
    return (
      <div>
        <WeekWeather
          days={days}
          city={city}
        />
        <Switch>
          <Route exact path="/" name="Week Graph" component={WeekGraphicWeather}/>
          <Route path="/:day" name="DayWeatherDetailed" render={ props => (
            <DayWeatherDetailed {...props} days={days}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default Weather;
