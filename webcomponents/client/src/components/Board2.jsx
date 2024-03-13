// /* eslint-disable no-unused-vars */
// import React from "react";
// import { fabric} from "fabric";
// import {useRef, useEffect, useState} from "react";

// const Board2 = () => {

//     const [penWidth,setPenWidth] = useState(3);
//     const [fabricCanvas, setFabricCanvas] = useState();

//     const canvasRef = useRef(null);
//     useEffect(() => {
//         const canvas = new fabric.Canvas(canvasRef.current,{
//             backgroundColor: "gray",
//             width: 1290,
//             height: 400,
//             isDrawingMode: true,
//         })
//         setFabricCanvas(canvas);

//         return () => {
//             canvas.dispose();
//         }
//     }, [canvasRef])

//     const changePenWidth = (width) => {
//         if(fabricCanvas) {
//             fabricCanvas.freeDrawingBrush.width = width;
//             setPenWidth(width);
//             fabricCanvas.renderAll.bind(fabricCanvas);
//         }
//     }

//     const clearCanvas = () => {
//         if(fabricCanvas) {
//             fabricCanvas.clear();
//         }
//     }
//     return(
//         <div className="container w-full h-full mt-[3rem]">
//         <p> White Board</p>
//             <canvas ref={canvasRef}>
//             </canvas>

//             <div>
//                 <div>
//                     <label> Pen Width - {penWidth} </label>
//                     <input type="range" onChange={e => changePenWidth(e.target.value)} value={penWidth} min={1} max={30}></input>
//                 </div>
//                 {/* <div>
//                     <label> Pen Color-</label>
//                 </div> */}

//                 <button onClick={() => clearCanvas()} type="button" className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white">
//                     Clear Whiteboard
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Board2;




import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

const Board2 = () => {
  const [penWidth, setPenWidth] = useState(3);
  const [fabricCanvas, setFabricCanvas] = useState();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "gray",
      width: 1290,
      height: 400,
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
    }
  };

  const captureAndSendImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: "png", // Change to "jpeg" for JPEG format
        quality: 1.0, // Quality (0.0 - 1.0)
      });

      // Convert dataURL to Blob
      const blob = dataURLtoBlob(dataURL);

      // Create a File object from Blob
      const file = new File([blob], "drawing.png", { type: "image/png" });

      // Now you can send the 'file' to your ML model
      // Example:
      // const formData = new FormData();
      // formData.append("image", file);
      // fetch("/your-ml-endpoint", {
      //   method: "POST",
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle response from ML model
      // })
      // .catch(error => {
      //   console.error("Error:", error);
      // });
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="container w-full h-full mt-[3rem]">
      <p> White Board</p>
      <canvas ref={canvasRef}></canvas>

      <div>
        <div>
          <label> Pen Width - {penWidth} </label>
          <input
            type="range"
            onChange={(e) => changePenWidth(e.target.value)}
            value={penWidth}
            min={1}
            max={30}
          ></input>
        </div>

        <button
          onClick={() => clearCanvas()}
          type="button"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white"
        >
          Clear Whiteboard
        </button>

        <button
          onClick={() => captureAndSendImage()}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white"
        >
          Send Image to ML Model
        </button>
      </div>
    </div>
  );
};

export default Board2;
