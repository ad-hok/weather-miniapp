import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment';
import { getWeekWeather } from '../../api/Weather/weather';

import WeekWeather from './WeekWeather'
import WeekGraphicWeather from './WeekGraphicWeather'
import DayWeatherDetailed from './DayWeatherDetailed'

/**
 * La clase contiene los componentes de clima semanal, clima diario y los gráficos correspondientes
 * @extends Component
 */
class Weather extends Component {
  constructor(){
    super();
    this.state = {
      days: [], //array con los días a ser presentados
      city: null //Nombre de la ciudad para mostrar el clima
    }
  }

  async componentDidMount(){
    try {
      //se recupera el tiempo desde la API usando la funcion getWeekWeather
      let res = await getWeekWeather();
      this._getDays(res.data.list);
      this._getCityInfo(res.data.city);
    } catch (e) {
      //aqui se debe manejar y/o mostrar el error, sentry o algún otro.
    }
  }

  /**
   * La funcion construye un array del clima por cada día
   * a partir de un array con el clima para hoy y los próximos 5 dias
   * la función guarda un estado con los días
   * @param  {Array} list el listado de climas para los días siguientes
   */
  _getDays(list){
    const days = [];
    //se almacena el día de hoy con formato definido
    const today = moment().format('YYYY-MM-DD');
    //se recorre el clima
    list.forEach( d => {
      //se almacena la fecha del clima con formato definido
      const day = moment(d.dt_txt).format('YYYY-MM-DD');
      //se almacena el nombre del día como palabra
      const dayName = moment(d.dt_txt).format('dddd');
      //se calcula la diferencia en dias entre hoy y cada dia de la lista
      //esta diferencia representa la posición del dia en el array
      const i = moment(day).diff(today, 'days');
      //si el día no existe en el array, se crea un nuevo dia
      if( !days[i] )
        days[i] = [];
      //se almacena el clima en el día (posicion) correspondiente
      days[i].push({...d, dayName});
    });
    //una vez construido el array de dias, se guarda el estado
    this.setState({
      days
    });
  }

  /**
   * La funcion almacena el nombre de la ciudad consultada en un estado
   * @param  {String} city la ciudad consultada
   */
  _getCityInfo(city){
    this.setState({
      city
    });
  }

  /**
   * El render contiene los componentes de clima semanal, gráfico semanal y detalle diario
   * React router carga el componente correspondiente segun la ruta
   * WeekWeather siempre se muestra en la parte superior
   * En la parte inferior, switch determina que componente se carga según la ruta
   * @return {Component} El componente requerido según la ruta
   */
  render() {
    //se almacenan los dias y la ciudad en constantes que serán usadas como props
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
