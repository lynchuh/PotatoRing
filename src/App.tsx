import React, { Fragment } from 'react';
import { BrowserRouter,Route } from 'react-router-dom'

import Login from './components/login'
import Index from './components/index'
import SignUp from './components/signUp'
import './App.scss';


// login signUp index
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Route path='/' exact={true} component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/signUp' component={SignUp} />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
