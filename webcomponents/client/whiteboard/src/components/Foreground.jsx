import React from 'react'
import Board2 from './Board2'
import TesseractOCR from '../pages/TesseractOCR'

// const Foreground = () => {
//   return (
//     <>
//       <Board2 />
//       <TesseractOCR /> */
//       onChange={({target: {files}}) => {
//                             files[0] && setFileName(files[0].name)
//                             if(files) {
//                                 setImage(URL.createObjectURL(files[0]))
//                             }
//                         }}
//     </>
//   )
// }

const Foreground = ({ isBoard2Active }) => {
  return (
    <>
      {isBoard2Active ? (
        <Board2 />
      ) : (
        <TesseractOCR
          onChange={(event) => {
            const files = event.target.files;
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
      )}
    </>
  );
};


export default Foreground

