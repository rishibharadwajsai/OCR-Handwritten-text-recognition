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


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Foreground from './components/Foreground';
import Board2 from './components/Board2';
import TesseractOCR from './pages/TesseractOCR';

const App = () => {
    const [isBoard2Active, setIsBoard2Active] = useState(true);

    const handleSwitchButtonClick = () => {
        setIsBoard2Active(prevState => !prevState);
    };

    return (
        <>
            <Navbar onSwitchButtonClick={handleSwitchButtonClick} />
            <Foreground isBoard2Active={isBoard2Active} />
        </>
    );
};

export default App;


