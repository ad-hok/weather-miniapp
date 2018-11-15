import React from 'react';
import ReactDOM from 'react-dom';
import DayGraphicWeather from '../views/Weather/DayGraphicWeather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DayGraphicWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});
