import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Item from './pages/Item'
import { Consumer } from './Context'
import { AnimatePresence } from 'framer-motion'
import './scss/output.css'


function App() {
  const { isClicked } = useContext(Consumer)
  return (
    <>
      <Header />
      <Sidebar />
      <div className={`bodyWrapper ${isClicked ? 'opacity' :''}`}>
        <AnimatePresence>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/item/:itemId'>
              <Item />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    </>

  );
}

export default (App);
