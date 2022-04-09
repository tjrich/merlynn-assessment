import React, { useState } from 'react'
import {CodeIcon, MenuIcon, XIcon} from '@heroicons/react/solid'
import Image from 'next/image';

const Nav = () => {

    let [open, setOpen] = useState(false);

    return (
        <nav className="select-none shadow-lg w-full sticky top-0 left-0">
            
            <div className="md:flex justify-between bg-white py-2 md:px-8 px-5 items-center">
                <div  onClick={() => setOpen(!open)}
                    className="w-8 absolute right-5 top-5 cursor-pointer md:hidden
                                transition-all ease-in-out duration-500">
                    {open ? <XIcon/>: <MenuIcon/>}
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-8
                                absolute md:static bg-white w-full
                                md:z-auto z-[-1] left-0 md:w-auto md:pl-0
                                pl-8 transition-all duration-500 ease-in-out md:opacity-100
                                ${open ? 'top-18 opacity-100':'top-[-490px] opacity-0'}`}>

                </ul>
            </div>
        </nav>
    )
}

export default Nav