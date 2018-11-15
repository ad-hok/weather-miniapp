import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle,
  Row, Col } from 'reactstrap';
import { getWeatherIcon } from '../../utilities'
import DayGraphicWeather from './DayGraphicWeather';

class DayWeatherDetailed extends Component {
  constructor(){
    super();
    this.state = {
      dayName: ''
    }
  }

  _renderDetail(){
    const day = this._getDay();
    return day
      .map( d => {
        const hour = moment(d.dt_txt).format('HH:mm');
        const temp = d.main.temp;
        const weather = getWeatherIcon(d.weather[0].id);
        return (
          <tr key={hour}>
            <td>
              {hour}
            </td>
            <td>
              {`${temp.toFixed(1)} ºC`}
            </td>
            <td>
              <i className={weather}></i>
            </td>
          </tr>
        );
      });
  }

  _getDay(){
    const days = this.props.days;
    const day = this.props.match.params.day;
    const dayIndex = days.findIndex(d => (d[0].dayName === day));
    if(!days || !days.length || dayIndex < 0 || dayIndex > 5){
      return [];
    }else{
      return days[dayIndex];
    }
  }

  _getDayName(){
    return this.props.match.params.day;
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Hourly Time: {this._getDayName()}
                </CardTitle>
                <Link to="/">
                  <CardSubtitle>
                    {'<-'} Back to Weekly Chart
                  </CardSubtitle>
                </Link>
              </CardHeader>
              <CardBody>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <td>Hour</td>
                      <td colSpan="2">Temp</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this._renderDetail()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6">
            <DayGraphicWeather
              day={this._getDay()}
              dayName={this._getDayName()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DayWeatherDetailed;
