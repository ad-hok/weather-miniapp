import React from 'react';
import ReactDOM from 'react-dom';
import DayWeather from '../views/Weather/DayWeather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DayWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});
