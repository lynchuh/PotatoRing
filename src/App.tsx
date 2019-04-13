import React from 'react';
import { Router } from 'react-router-dom'
import history from './config/history'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

import { Provider } from 'react-redux'
import store from './store'

import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            {renderRoutes(routes)}
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
