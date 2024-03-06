/* eslint-disable no-unused-vars */
import React from "react";
import { fabric} from "fabric";
import {useRef, useEffect, useState} from "react";

const Board2 = () => {

    const [penWidth,setPenWidth] = useState(3);
    const [fabricCanvas, setFabricCanvas] = useState();

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current,{
            backgroundColor: "gray",
            width: 1290,
            height: 400,
            isDrawingMode: true,
        })
        setFabricCanvas(canvas);

        return () => {
            canvas.dispose();
        }
    }, [canvasRef])

    const changePenWidth = (width) => {
        if(fabricCanvas) {
            fabricCanvas.freeDrawingBrush.width = width;
            setPenWidth(width);
            fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }

    const clearCanvas = () => {
        if(fabricCanvas) {
            fabricCanvas.clear();
        }
    }
    return(
        <div className="container w-full h-full mt-[3rem]">
        <p> White Board</p>
            <canvas ref={canvasRef}>
            </canvas>

            <div>
                <div>
                    <label> Pen Width - {penWidth} </label>
                    <input type="range" onChange={e => changePenWidth(e.target.value)} value={penWidth} min={1} max={30}></input>
                </div>
                {/* <div>
                    <label> Pen Color-</label>
                </div> */}

                <button onClick={() => clearCanvas()} type="button" className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white">
                    Clear Whiteboard
                </button>
            </div>
        </div>
    )
}

export default Board2;