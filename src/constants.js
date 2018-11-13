//API KEY de openweathermap
export const API_KEY = '901e7a4b4efbe240fdfee5a321b59d4c';

//ciudad para consultar el tiempo
export const CITY = 'santiago';

//pais para consultar el tiempo
export const COUNTRY = 'cl';

//cadena para petición de tiempo del 1 día a la API del tiempo
export const DAY_QUERY = `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

//cadena para petición de tiempo de 5 días a la API del tiempo
export const WEEK_QUERY = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

//iconos para representar el tiempo, se utiliza https://erikflowers.github.io/weather-icons/ 
export const DAY_THUNDERSTORM_ICON = 'wi wi-day-thunderstorm display-4';
export const NIGHT_THUNDERSTORM_ICON = 'wi wi-night-thunderstorm display-4';
export const NEUTRAL_THUNDERSTORM_ICON = 'wi wi-thunderstorm display-4';

export const DAY_DRIZZLE_ICON = 'wi wi-day-showers display-4';
export const NIGHT_DRIZZLE_ICON = 'wi wi-night-showers display-4';
export const NEUTRAL_DRIZZLE_ICON = 'wi wi-showers display-4';

export const DAY_RAIN_ICON = 'wi wi-day-rain display-4';
export const NIGHT_RAIN_ICON = 'wi wi-night-rain display-4';
export const NEUTRAL_RAIN_ICON = 'wi wi-rain display-4';

export const DAY_SNOW_ICON = 'wi wi-day-snow display-4';
export const NIGHT_SNOW_ICON = 'wi wi-night-snow display-4';
export const NEUTRAL_SNOW_ICON = 'wi wi-snow display-4';

export const DAY_FOG_ICON = 'wi wi-day-fog display-4';
export const NIGHT_FOG_ICON = 'wi wi-night-fog display-4';
export const NEUTRAL_FOG_ICON = 'wi wi-fog display-4';

export const DAY_CLEAR_ICON = 'wi wi-day-sunny display-4';
export const NIGHT_CLEAR_ICON = 'wi wi-night-clear display-4';
export const NEUTRAL_CLEAR_ICON = 'wi wi-day-sunny display-4';

export const DAY_CLOUDY_ICON = 'wi wi-day-cloudy display-4';
export const NIGHT_CLOUDY_ICON = 'wi wi-night-cloudy display-4';
export const NEUTRAL_CLOUDY_ICON = 'wi wi-cloudy display-4';
