// import React from 'react'
// import Board2 from './Board2'
// import TesseractOCR from '../pages/TesseractOCR'

// const Foreground = () => {
//   return (
//     <>
//       <Board2 />
// {/*       <TesseractOCR /> */}
//       {/* onChange={({target: {files}}) => {
//                             files[0] && setFileName(files[0].name)
//                             if(files) {
//                                 setImage(URL.createObjectURL(files[0]))
//                             }
//                         }} */}
//     </>
//   )
// }

// export default Foreground


import React, { useState } from 'react';
import Board2 from './Board2';
import TesseractOCR from '../pages/TesseractOCR';

const Foreground = () => {
  const [isBoard2, setIsBoard2] = useState(true);

  const switchComponent = () => {
    setIsBoard2(!isBoard2);
  };

  return (
    <>
      {isBoard2 ? <Board2 /> : <TesseractOCR />}
      <button onClick={switchComponent}>Switch</button>
    </>
  );
};

export default Foreground;
