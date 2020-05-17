import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import './scss/base.scss'



function App() {
  return (
    <>
      <Header />
      <hr />
      <Sidebar/>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route  path='/about'>
            <About />
          </Route>
          <Route  path='/contact'>
            <Contact />
          </Route>
        </Switch>
      </div>
    </>

  );
}

export default App;
