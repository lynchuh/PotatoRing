import React from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from './store'
import history from './config/history'
import routes from './routes'
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
