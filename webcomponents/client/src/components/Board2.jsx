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



import React, { useRef, useState } from "react";
import { fabric } from "fabric";

const Board2 = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [penWidth, setPenWidth] = useState(5);
  const [drawingImage, setDrawingImage] = useState(null);

  const initCanvas = () => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: "white",
    });
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = penWidth;
    setFabricCanvas(canvas);
  };

  const changePenWidth = (value) => {
    setPenWidth(value);
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = value;
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
    }
  };

  const captureDrawingImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: "png",
        quality: 1.0,
      });

      const blob = dataURLtoBlob(dataURL);
      const file = new File([blob], "drawing.png", { type: "image/png" });

      setDrawingImage(dataURL);
      sendToModel(file);
    }
  };

  const sendToModel = (file) => {
    // Send the 'file' to your ML model
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

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = drawingImage;
    link.download = "drawing.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          onClick={() => captureDrawingImage()}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white"
        >
          Submit
        </button>
      </div>

      {drawingImage && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">Captured Drawing:</p>
          <img src={drawingImage} alt="Captured Drawing" />
          <button
            onClick={() => downloadImage()}
            type="button"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white mt-4"
          >
            Download Image
          </button>
        </div>
      )}

      {!fabricCanvas && <div className="mt-4">Initializing canvas...</div>}
    </div>
  );
};

export default Board2;

