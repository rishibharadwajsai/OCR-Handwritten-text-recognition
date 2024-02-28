/* eslint-disable no-unused-vars */
import React from 'react'
import Button from './Button'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
    const links = [
        {name: "Home", link:"/"},
        {name: "Working", link:"/"},
        {name: "Team", link: "/"},
    ];

    let [isOpen,setisOpen] = useState(false);
  return (
    <>
        <div className='shadow-md w-full z-[10] fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-sky-200 py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                    OCR System
                </div>
                <div onClick={() => setisOpen(!isOpen)} className='text-3xl absolute right-8 top-[30%] cursor-pointer md:hidden'>
                    {/* <ion-icon name={isOpen ? "close":"menu"}></ion-icon> */}
                    {isOpen ? <IoMdClose/>:<GiHamburgerMenu/> }
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-20 opacity-100' : 'top-[-490px]'} md:opacity-100 opacity-0`}>
                    {
                        links.map((item) => (
                            <li key={item.name} className='md:ml-8 text-lg md:my-0 my-6'>
                                <a href={item.link} className='text-gray-800 hover:text-gray-400 duration-500'>{item.name}</a>
                            </li>
                        ))
                    }
                    <Button>
                        Get Started
                    </Button>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar