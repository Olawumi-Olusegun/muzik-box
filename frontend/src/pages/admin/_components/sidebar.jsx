import React from 'react'
import { assets } from '../../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-[#003a10] h-full pl-[4vw] py-5'>
        <NavLink to={"/admin"}>
            <img src={assets.spotify_logo} alt="logo" className='w-[max(10vw, 100px)] hidden sm:block cursor-pointer' />
            <img src={assets.spotify_logo} alt="logo" className='w-[max(5vw, 40px)] mr-5 sm:hidden block cursor-pointer' />        
        </NavLink>

        <div className="flex flex-col gap-5 mt-10">
            <NavLink to={"add-song"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 md:pr-[max(8vw,100px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium ">
                <img src={assets.arrow_icon} alt="plus-icon" className='w-5' />
                <p className="hidden sm:block text-green-800">Add Song</p>
            </NavLink>
            <NavLink to={"list-songs"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 md:pr-[max(8vw,100px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium ">
                <img src={assets.arrow_icon} alt="plus-icon" className='w-5' />
                <p className="hidden sm:block  text-green-800">List Song</p>
            </NavLink>
            <NavLink to={"add-album"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 md:pr-[max(8vw,100px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium ">
                <img src={assets.arrow_icon} alt="plus-icon" className='w-5' />
                <p className="hidden sm:block  text-green-800">Add Album</p>
            </NavLink>
            <NavLink to={"list-albums"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 md:pr-[max(8vw,100px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium ">
                <img src={assets.arrow_icon} alt="plus-icon" className='w-5' />
                <p className="hidden sm:block  text-green-800">List Album</p>
            </NavLink>


        </div>
    </div>
  )
}

export default Sidebar