import * as React from 'react';
import { BrowserRouter,Link, Route } from 'react-router-dom'

import './App.scss';



class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/topics' component={Topic}/>
          <Link to='/'>首页</Link>
          <Link to='/about'>关于</Link>
          <Link to='/topics'>主题</Link>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}
function Home() {
  return <h2>Home</h2>;
}
function About() {
  return <h2>about</h2>;
}
function Topic() {
  return <h2>topic</h2>;
}

export default App;
