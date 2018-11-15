import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardFooter } from 'reactstrap';
import moment from 'moment';
import { getAverageWeather, getWeatherIcon } from '../../utilities'

/**
 * La clase renderiza el clima promedio de una día según el clima por horas recibido
 * @extends Component
 */
class DayWeather extends Component {
  /**
   * Calcula la temperatura mas baja entre todas las recibidas
   * @param  {Array} temps Las temperaturas del día
   * @return {Float}       La temperatura mas baja
   */
  _minTemp(temps){
    //mediante reduce se recorren las temperaturas y se devuelve la mínima de ellas
    return temps.reduce( (min, t) => (t.main.temp < min)?t.main.temp:min, temps[0].main.temp);
  }

  /**
   * Calcula la temperatura mas alta entre todas las recibidas
   * @param  {Array} temps las temperaturas del día
   * @return {Float}       La temperatura mas alta
   */
  _maxTemp(temps){
    //mediante reduce se recorren las temperaturas y se devuelve la máxima de ellas
    return temps.reduce( (max, t) => (t.main.temp > max)?t.main.temp:max, temps[0].main.temp);
  }

  /**
   * Obtiene el icono que representa el clima del día
   * @param  {Array} temps los climas del día
   * @return {String}      La clase del icono a mostrar
   */
  _getIcon(temps){
    const code = getAverageWeather(temps);
    return getWeatherIcon(code);
  }

  /**
   * Presenta el clima promedio de un dia, y sus temperaturas máxima y mínima
   * el componente agrega un Link en el nombre del día, que sirve para cargar el
   * componente que carga el detalle diario
   * @return {Component} El clima del día
   */
  render() {
    const { day, i } = this.props;
    if(!day) return '';
    const min = this._minTemp(day);
    const max = this._maxTemp(day);
    const icon = this._getIcon(day);
    return (
      <div>
        <Card>
          <CardBody className="text-center">
            <CardSubtitle className="mb-4">
              <Link
                to={`/${day[0].dayName}`}
              >
                {moment(day[0].dt_txt).format('ddd')}
              </Link>
            </CardSubtitle>
            <i className={icon}></i>
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
