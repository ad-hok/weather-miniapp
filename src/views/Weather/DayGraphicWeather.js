import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from '@vx/axis';
import moment from 'moment';

import { getMaxDayTemp, getMinDayTemp } from '../../utilities'

/**
 * La clase presenta el gráfico de tempraturas de un día
 * @extends Component
 */
class DayGraphicWeather extends Component {
  constructor(){
    super();

    this.state = {
      width: 600,
      height: 300
    }
  }

  /**
   * El método calcula el ancho del contendor del gráfico
   */
  componentDidMount(){
    try {
      const width = document.getElementById("chart").offsetWidth;
      this.setState({ width });
    } catch (e) {
      //aqui se debe manejar y/o mostrar el error, sentry o algún otro.
    }
  }

  /**
   * El método verifica cambios que requieran actualiza el gráfico y recalcula el ancho
   */
  componentDidUpdate(){
    let { width } = this.state
    try {
      const newWidth = document.getElementById("chart").offsetWidth;
      if(width !== newWidth){
        width = newWidth;
        this.setState({ width });
      }
    } catch (e) {
      //manejar el error
    }
  }

  /**
   * Renderiza el gráfico de temperaturas de un día
   * @see https://github.com/hshoff/vx
   * @return {Component} El gráfico del día
   */
  render() {
    //se obtienen datos del clima y nombre del dia desde props
    const { day, dayName } = this.props;
    //se obtienen las medidas del contenedor del gráfico desde estados
    const { height, width } = this.state;
    //si no existen datos del dia, se detiene el renderizado el gráfico
    if(!day || !day.length) return '';
    //función local que indica el valor de cada elemento en el eje x
    const x = d => new Date(d.dt_txt);
    //función local que indica el valor de cada elemento en el eje y
    const y = d => parseFloat(d.main.temp);
    //temperatura minima del dia
    const minTemp = getMinDayTemp(day);
    //temperatura maxima del dia
    const maxTemp = getMaxDayTemp(day);
    //se establece la hora mínima como el primer registro del día
    const minDate = new Date(day[0].dt_txt);
    // se establce la hora máxima 24 horas despues del primer registro del día
    const maxDate = new Date(minDate).setDate(minDate.getDate() + 1);
    /**
     * La variable almacena la información de los limites gráficos y de información en eje x
     * @type {scaleTime}
     */
    const xScale = scaleTime({
      range: [0, width-80],
      domain: [minDate, maxDate]
    });
    /**
     * La variable almacena la información de los limites gráficos y de información en eje y
     * Se añaden +-2 grados a la temperatura, para efectos visuales
     * @type {scaleLinear}
     */
    const yScale = scaleLinear({
      range: [height-50, 0],
      domain: [minTemp-2, maxTemp+2],
    });
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              Hourly Graphic: {dayName}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div id="chart">
              <svg width={width} height={height}>
                <rect x={80} y={10} width={width-80} height={height-50} fill="#EBEAEC" />
                <defs>
                  <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000" />
                    <stop offset="100%" stopColor="#000" />
                  </linearGradient>
                </defs>
                <Group top="10" left="80">
                  <AxisLeft
                    scale={yScale}
                    top={0}
                    label={'Temp ºC'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                  />
                  <AxisBottom
                    scale={xScale}
                    top={height-50}
                    left={0}
                    label={'Hour'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                    numTicks={6}
                    tickFormat={(val, i) => moment(val).format('HH:mm')}
                  />
                  <LinePath
                    data={day}
                    x={x}
                    y={y}
                    xScale={xScale}
                    yScale={yScale}
                    strokeWidth={3}
                    stroke="#000"
                    strokeLinecap="round"
                  />
                </Group>
              </svg>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DayGraphicWeather;
