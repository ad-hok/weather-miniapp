import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle, CardFooter } from 'reactstrap';
import moment from 'moment';
import { getAverageWeather, getWeatherIcon } from '../../utilities'

class DayWeather extends Component {
  _minTemp(temps){
    return temps.reduce( (min, t) => (t.main.temp < min)?t.main.temp:min, temps[0].main.temp);
  }

  _maxTemp(temps){
    return temps.reduce( (max, t) => (t.main.temp > max)?t.main.temp:max, temps[0].main.temp);
  }

  _getIcon(temps){
    const code = getAverageWeather(temps);
    return getWeatherIcon(code);
  }

  render() {
    const { day } = this.props;
    if(!day) return '';
    const min = this._minTemp(day);
    const max = this._maxTemp(day);
    const icon = this._getIcon(day);
    return (
      <div>
        <Card>
          <CardBody className="text-center">
            <CardSubtitle className="mb-4">
              {moment(day[0].dt_txt).format('ddd')}
            </CardSubtitle>
            <i className={icon}></i>{getAverageWeather(day)}
          </CardBody>
          <CardFooter>
            {`Max: ${max.toFixed(0)}º - Min: ${min.toFixed(0)}º`}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default DayWeather;
