import axios from 'axios';
import { WEEK_QUERY } from '../../constants'

/**
 * La función consulta la API de https://openweathermap.org y recibe el clima de 5 días
 * @return {Promise} Promesa que al ser resuelta entregará el resultado de la query
 */
function getWeekWeather(){
  return axios(WEEK_QUERY);
}

export { getWeekWeather }
