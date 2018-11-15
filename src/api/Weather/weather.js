import axios from 'axios';
import { WEEK_QUERY, DAY_QUERY } from '../../constants'

/**
 * La función consulta la API de https://openweathermap.org y recibe el clima de 5 días
 * @return {Promise} Promesa que al ser resuelta entregará el resultado de la query
 */
function getWeekWeather(){
  return axios(WEEK_QUERY);
}

/**
 * La función consulta la API de https://openweathermap.org y recibe el clima del día en curso
 * @return {Promise} Promesa que al ser resuelta entregará el resultado de la query
 */
function getDayWeather(){
  return axios(DAY_QUERY);
}

export { getWeekWeather, getDayWeather }
