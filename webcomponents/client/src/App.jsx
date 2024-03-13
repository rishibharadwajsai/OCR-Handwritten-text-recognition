/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './components/Navbar'
import Board2 from './components/Board2'
import Foreground from './components/Foreground'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TesseractOCR from './pages/TesseractOCR';



const App = () => {
  // return (
  //   <>
  //     <Navbar />
  //     <Foreground />
  //   </>
  // )
  return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" component={Foreground} />
                </Switch>
            </div>
        </Router>
    );
};

export default App
