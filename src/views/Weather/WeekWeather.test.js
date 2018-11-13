import React from 'react';
import ReactDOM from 'react-dom';
import WeekWeather from './WeekWeather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeekWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});
