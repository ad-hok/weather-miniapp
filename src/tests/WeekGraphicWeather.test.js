import React from 'react';
import ReactDOM from 'react-dom';
import WeekGraphicWeather from '../views/Weather/WeekGraphicWeather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeekGraphicWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});
