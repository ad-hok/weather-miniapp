import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle,
  Row, Col } from 'reactstrap';
import moment from 'moment';

import DayWeather from './DayWeather';
import { getWeekWeather } from '../../api/Weather/weather';

class WeekWeather extends Component {
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
      const i = moment(day).diff(today, 'days');
      if( !days[i] ) days[i] = [];
      days[i].push(d);
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

  _renderDays(){
    const { days } = this.state;
    return days.map( (d, i) => {
      return (
          <Col
            key={i}
            xs="6"
            sm="4"
            md="3"
            lg="2"
          >
            <DayWeather
              day={d}
              i={i}
            />
          </Col>
      )
    });
  }

  render() {
    const { days, city } = this.state;
    if(!days.length || !city) return '';
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Pronóstico del tiempo</CardTitle>
            <CardSubtitle>{city.name} / Próximos 5 días</CardSubtitle>
          </CardHeader>
          <CardBody>
            <Row>
              {this._renderDays()}
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WeekWeather;
