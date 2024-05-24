import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {


    const navigate=useNavigate();
    return(
        <div className="w-full cursor-pointer sticky bg-gray-700 top-0 z-10 italic " onClick={()=>navigate("/")}>
            <h1 className='text-[3.2rem] font-semibold text-center'>Movie Explorer</h1>
        </div>
    )
}