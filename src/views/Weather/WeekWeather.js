import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle,
  Row, Col } from 'reactstrap';

import DayWeather from './DayWeather';

class WeekWeather extends Component {

  _renderDays(){
    const { days } = this.props;
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
    const { days, city } = this.props;
    if(!days.length || !city) return '';
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Weather forecast</CardTitle>
            <CardSubtitle>{city.name} / Next 5 days</CardSubtitle>
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
