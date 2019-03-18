import React, { Fragment } from 'react';
import { Route,Router } from 'react-router-dom'
import history from './config/history'
import Login from './components/login'
import Index from './components/index'
import SignUp from './components/signUp'
import './App.scss';


// login signUp index
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Router history={history}>
          <Fragment>
            <Route path='/' exact={true} component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/signUp' component={SignUp} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
