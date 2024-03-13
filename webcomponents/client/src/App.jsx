/* eslint-disable no-unused-vars */
// import React from 'react'
// import Navbar from './components/Navbar'
// import Board2 from './components/Board2'
// import Foreground from './components/Foreground'
// import TesseractOCR from './pages/TesseractOCR';



// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Foreground />
//     </>
//   )
// };

// export default App


import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { default as Switch } from 'react-router-dom/esm/react-router-dom.min.js';
import Navbar from './components/Navbar';
import Foreground from './components/Foreground';
import Board2 from './components/Board2';
import TesseractOCR from './pages/TesseractOCR';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path='/board2' component={Board2} />
          <Route path='/tesseract' component={TesseractOCR} />
          <Route path='/' component={Foreground} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
