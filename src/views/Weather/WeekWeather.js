import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle,
  Row, Col } from 'reactstrap';

import DayWeather from './DayWeather';

/**
 * La clase renderiza los días y el clima de cada uno
 * @extends Component
 */
class WeekWeather extends Component {

  /**
   * El método carga el componente DayWeather para cadá dia a mostrar
   * @return {[type]} [description]
   */
  _renderDays(){
    //se reciben los dias desde los props
    const { days } = this.props;
    //se recorre el array recibido y se muestra el componente DayWeather para cada elemento
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

  /**
   * Renderiza el componente y los días requeridos
   * @return {Component} Los días requeridos
   */
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
