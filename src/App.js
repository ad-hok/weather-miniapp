import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Weather from './views/Weather/Weather'

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" name="Weather" component={Weather}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
