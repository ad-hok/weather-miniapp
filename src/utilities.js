import { DAY_THUNDERSTORM_ICON, NIGHT_THUNDERSTORM_ICON, NEUTRAL_THUNDERSTORM_ICON,
  DAY_DRIZZLE_ICON, NIGHT_DRIZZLE_ICON, NEUTRAL_DRIZZLE_ICON, DAY_RAIN_ICON,
  NIGHT_RAIN_ICON, NEUTRAL_RAIN_ICON, DAY_SNOW_ICON, NIGHT_SNOW_ICON,
  NEUTRAL_SNOW_ICON, DAY_FOG_ICON, NIGHT_FOG_ICON, NEUTRAL_FOG_ICON, DAY_CLEAR_ICON,
  NIGHT_CLEAR_ICON, NEUTRAL_CLEAR_ICON, DAY_CLOUDY_ICON, NIGHT_CLOUDY_ICON,
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
