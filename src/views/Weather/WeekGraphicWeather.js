import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from '@vx/axis';
import moment from 'moment';
import { getWeekWeather } from '../../api/Weather/weather';
import { getMaxDayTemp, getMaxWeekTemp, getMinWeekTemp } from '../../utilities'

/**
 * La clase crear el gráfico del clima semanal
 * @extends Component
 */
class WeekGraphicWeather extends Component {
  constructor(){
    super();

    this.state = {
      chartData: null,
      width: 800,
      height: 300
    }
  }

  /**
   * La funcion se ejecuta al finalizar el montaje del componente
   * Recupera el listado del clima semanal
   * Calcula el ancho del contenedor del gráfico
   * @return {Promise} La promesa carga la información del gráfico y el ancho de este
   */
  async componentDidMount(){
    try {
      //se recupera el listado de clima semanal
      let res = await getWeekWeather();
      this._getDays(res.data.list);
      //se calcula el ancho del contenedor del gráfico
      const width = document.getElementById("chart").offsetWidth;
      //se almacena el ancho del contenedor del gráfico
      this.setState({ width });
    } catch (e) {
      //aqui se debe manejar y/o mostrar el error, sentry o algún otro.
    }
  }

  /**
   * La funcion construye un array del clima por cada día
   * a partir de un array con el clima para hoy y los próximos 5 dias
   * la función construye la información para el gráfico, incluyendo día
   * y temperatura promedio
   * @param  {Array} list El listado de climas de los5 dias
   */
  _getDays(list){
    const days = [];
    //se almacena el dia de hoy
    const today = moment().format('YYYY-MM-DD');
    // se recorren los climas de la API
    list.forEach( d => {
      //se almacena el dia a recorrer
      const day = moment(d.dt_txt).format('YYYY-MM-DD');
      //se calcula la diferencia en dias entre hoy y cada dia de la lista
      //esta diferencia representa la posición del dia en el array
      const i = moment(day).diff(today, 'days');
      //si el día no existe en el array, se crea un nuevo dia
      if( !days[i] ) days[i] = [];
      //se almacena el clima en el día (posicion) correspondiente
      days[i].push(d);
    });
    //se recorre el array recién construido
    const chartData = days.map( d => {
      //se calcula la temperatura promedio del dia
      const avgTemp = getMaxDayTemp(d);
      //se extrae la fecha del dia
      const date = moment(d[0].dt_txt).format('YYYY-MM-DD');
      //se retorna un objeto con la fecha y la temperatura del dia
      return {
        date,
        temp: avgTemp
      };
    });
    //se guarda un estado con los datos para el gráfico
    this.setState({
      chartData
    });
  }

  /**
   * Renderiza el gráfico con los datos de los días utilizando VX
   * @see https://github.com/hshoff/vx
   * @return {Component} Gráfico de clima semanal
   */
  render() {
    // se recuperan los datos de gráfico, su ancho y alto
    const { chartData, height, width } = this.state;
    //si no hay datos para el gráfico, se detiene el renderizado
    if(!chartData) return '';
    //se calcula la temperatura minima de todos los dias
    const minTemp = getMinWeekTemp(chartData);
    //se calcula la temperatura maxima de todos los dias
    const maxTemp = getMaxWeekTemp(chartData);
    //se extrae la fecha mas antigua (hoy)
    const minDate = new Date(chartData[0].date);
    //la fecha máxima se establece en hoy + 6 dias
    //Se agrega un día para que quede un espacio al final del gráfico
    const maxDate = new Date(minDate).setDate(minDate.getDate() + 6);
    //se crea funcion local que indica el valor en eje x para cada elemento
    const x = d => new Date(d.date);
    //se crea funcion local que indica el valor en eje y para cada elemento
    const y = d => parseFloat(d.temp);
    /**
     * la variable almacena los límites gráficos y de información del eje x
     * El eje x representa la fecha
     * @type {scaleTime}
     */
    const xScale = scaleTime({
      range: [20, width-80],
      domain: [minDate, maxDate]
    });
    /**
     * la variable almacena los límites gráficos y de información del eje y
     * El eje y representa la temperatura
     * @type {scaleLinear}
     */
    const yScale = scaleLinear({
      range: [height-50, 0],
      domain: [minTemp-2, maxTemp+2],
    });
    /*
    El gráfico el lineal, eje x es la fecha, eje y es la temperatura
     */
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Graphic</CardTitle>
        </CardHeader>
        <CardBody>
          <div id="chart">
            <svg width={width} height={height}>
              <rect x={80} y={10} width={width-100} height={height-50} fill="#EBEAEC" />
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
                  left={-30}
                  label={'Day'}
                  stroke={'#1b1a1e'}
                  tickTextFill={'#1b1a1e'}
                  numTicks={6}
                  tickFormat={(val, i) => moment(val).format('ddd')}
                />
                <LinePath
                  data={chartData}
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
    );
  }
}

export default WeekGraphicWeather;
