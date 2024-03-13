/* eslint-disable no-unused-vars */
import React, { useCallback,useEffect,useState } from 'react'
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {AiFillFileImage} from "react-icons/ai";
import { createWorker } from "tesseract.js";

const TesseractOCR = () => {

    const [image,setImage] =useState(null);
    const [fileName,setFileName] = useState("No selected file");
    const [valid, seValid] = useState(false);
    const [textResult, setTextResult] = useState("");

    const convertor = async (pic) => {
        const worker = await createWorker("eng");
        const ret = await worker.recognize(pic);
        const text = ret.data.text;
        await worker.terminate();
        return text;
    }

    const convert = async (url) => {
        if(url) {
            await convertor(url).then((txt) => {
                if(txt) {
                    setTextResult(txt);
                }
            })
        }
    }


    const handleChange = (e) => {
        if(e.target.files) {
            setFileName(e.target.files[0].name)
            let url = URL.createObjectURL(e.target.files[0])
            setImage(url)
            convert(url)
        } else {
            setImage(null)
            setTextResult("")
        }
    }

  return (
    <>
        <section className="bg-gray-200 mt-[5rem] flex mx-auto flex-col justify-center items-center">
            <p className="mt-[2rem] mb-[1rem]"> Image to Text</p>
            
            <div className="w-[100%] flex items-center justify-center">
                <div className="bg-green-500 w-[45%]">
                    <form onClick={()=> document.querySelector("input[type=file]").click()} className="flex flex-col justify-center items-center border-dashed border-2 border-blue-500 rounded-lg cursor-pointer h-[20rem]">
                        <input type="file" accept="image/*" hidden onChange={handleChange}/>

                    {image ? <img src={image} width={300} height={250} alt={fileName} /> :
                    <>
                    <MdCloudUpload color="#1475cf" size={60} />
                    <p className=""> Upload Image</p>
                    </> }
                    </form>

                    <div className="flex justify-between  mt-[0.5rem]">
                    <div className="flex ml-[1rem] items-center">
                        <AiFillFileImage color='#1475cf' size={30}/>
                        <span className="">{fileName}</span>
                    </div>
                    <MdDelete size={25} className="cursor-pointer mr-[0.25rem]" onClick={() => {
                        setFileName("No selected file")
                        setImage(null)
                    }} />
                    </div>
                </div>
                <div className="bg-red-500 w-[45%]">
                    <p className="">{textResult}</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default TesseractOCR