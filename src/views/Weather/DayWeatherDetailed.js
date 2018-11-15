import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle,
  Row, Col } from 'reactstrap';
import { getWeatherIcon } from '../../utilities'
import DayGraphicWeather from './DayGraphicWeather';

/**
 * La clase representa el tiempo de un día en detalle
 * @extends Component
 */
class DayWeatherDetailed extends Component {
  constructor(){
    super();
    this.state = {
      dayName: ''
    }
  }

  /**
   * El método renderiza el clima a lo largo del día
   * @return {Component} los climas del día
   */
  _renderDetail(){
    //se obtiene el día requerido según la ruta indicada
    const day = this._getDay();
    //se recorren los climas del día
    return day
      .map( d => {
        //se obtiene la hora del clima
        const hour = moment(d.dt_txt).format('HH:mm');
        //se obtiene la temperatura de ese momento
        const temp = d.main.temp;
        //se obtiene el icono que representa el clima de ese momento
        const weather = getWeatherIcon(d.weather[0].id);
        //se retorna una fila que incluye hora, temperatura e icono
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

  /**
   * Obtiene el día requerido de prop de dias, a partir del String del prop  day
   * @return {Array} Clima de un dia en detalle
   */
  _getDay(){
    //los días con el clima entregado por props
    const days = (this.props && this.props.days)?this.props.days:[];
    //el dia requerido, obtenido desde los props de parametros de ruta
    const day = this._getDayName();
    //se obtiene el indice del dia en el array days, según el String day
    const dayIndex = days.findIndex(d => (d[0].dayName === day));
    /*
    si no se reciben props con dias, o viene vacío, o el índice está
    fuera de los rangos permitidos, se retorna Array vacío []
    */
    if(!days || !days.length || dayIndex < 0 || dayIndex > 5){
      return [];
    }else{
      return days[dayIndex];
    }
  }

  /**
   * Obtiene el nombre del día según props
   * @return {String} El nombre del día consultado
   */
  _getDayName(){
    return (this.props
      && this.props.match
      && this.props.match.params
      && this.props.match.params.day)?this.props.match.params.day: '';
  }

  /**
   * Renderiza una tabla con el clima detallado del dia requerido
   * @return {Component} El clima de un dia y el grafico diario
   */
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
