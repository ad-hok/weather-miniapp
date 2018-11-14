import { DAY_THUNDERSTORM_ICON, DAY_DRIZZLE_ICON, NEUTRAL_RAIN_ICON,
  NEUTRAL_SNOW_ICON, NEUTRAL_FOG_ICON, DAY_CLEAR_ICON, DAY_CLOUDY_ICON,
  NEUTRAL_CLOUDY_ICON } from './constants'

/**
 * [la función permite calcular el clima promedio del día]
 * Está función es una aproximación al clima promedio, y debe ser mejorada en futuras versiones,
 * no se asegura que ante variaciones muy abruptas del clima, funcione correctamente.
 * @param  {[Array]} temps [temperaturas de un día]
 * @return {[Int]}      [el valor numérico asociado al clima según https://openweathermap.org/weather-conditions ]
 */
export const getAverageWeather = (temps) => {
  const totalTemp = temps.reduce( (sum, t) =>  sum + t.weather[0].id,0);
  return parseInt((totalTemp / temps.length).toFixed(0));
};

/**
 * [la función permite calcular la temperatura promedio del día]
 * @param  {Array} temps [temperaturas de un día]
 * @return {Float} temperatura promedio del dia
 */
export const getAverageTemp = (temps) => {
  const totalTemp = temps.reduce( (sum, t) =>  sum + t.main.temp,0);
  return parseFloat((totalTemp / temps.length).toFixed(1));
};

/**
 * [la función permite calcular la temperatura maxima del un dia]
 * @param  {Array} temps [temperaturas]
 * @return {Float} temperatura máxima
 */
export const getMaxDayTemp = (temps) => {
  const maxTemp = temps.reduce( (max, t) => (t.main.temp > max)?t.main.temp:max, temps[0].main.temp);
  return parseFloat(maxTemp);
};

/**
 * [la función permite calcular la temperatura maxima del listado enviado]
 * @param  {Array} temps [temperaturas]
 * @return {Float} temperatura máxima
 */
export const getMaxWeekTemp = (temps) => {
  const maxTemp = temps.reduce( (max, t) => (t && t.temp > max)?t.temp:max, temps[1].temp);
  return parseFloat(maxTemp);
};

/**
 * [la función permite calcular la temperatura mínima del listado enviado]
 * @param  {Array} temps [temperaturas]
 * @return {Float} temperatura minima
 */
export const getMinWeekTemp = (temps) => {
  const minTemp = temps.reduce( (min, t) => (t && t.temp < min)?t.temp:min, temps[1].temp);
  return parseFloat(minTemp);
};

/**
 * [la función devuelve un icono descriptivo para el valor numérico del clima]
 * @param  {[Int]} weather [valor numérico asociado al clima]
 * @return {[String]}  [la clase del icono a mostrar]
 */
export const getWeatherIcon = (weather) => {
  if(parseInt(weather) < 800){
    weather = weather - (weather % 100);
  }
  const code = parseInt(weather);
  switch (code) {
    case 200:
      return DAY_THUNDERSTORM_ICON;
    case 300:
      return DAY_DRIZZLE_ICON;
    case 500:
      return NEUTRAL_RAIN_ICON;
    case 600:
      return NEUTRAL_SNOW_ICON;
    case 700:
      return NEUTRAL_FOG_ICON;
    case 800:
      return DAY_CLEAR_ICON;
    case 801:
      return DAY_CLOUDY_ICON;
    case 802:
      return NEUTRAL_CLOUDY_ICON;
    default:
      return NEUTRAL_CLOUDY_ICON;
  }
};
