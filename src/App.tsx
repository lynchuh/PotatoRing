import React, { Fragment } from 'react';
import { Route,Router } from 'react-router-dom'
import history from './config/history'
import Login from './components/login'
import Home from './components/home'
import SignUp from './components/signUp'

import { Provider } from 'react-redux'
import store from './store'

import './App.scss';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Fragment>
              <Route path='/' exact={true} component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/signUp' component={SignUp} />
            </Fragment>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
