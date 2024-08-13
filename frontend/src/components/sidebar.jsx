import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full p-2 hidden flex-col lg:flex  gap-2 text-white/90'>
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around ">
        <Link to={"/"} className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-[#202020] py-2 duration-300 ">
          <img src={assets.home_icon} alt="home-icon" className='w-6' />
          <p className='font-bold'>Home</p>
        </Link>
        <div className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-[#202020] py-2 duration-300 ">
          <img src={assets.search_icon} alt="search_icon" className='w-6' />
          <p className='font-bold'>Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} alt="stack_icon" className='w-8' />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-1">

            <div className="w-8 h-8 p-2 rounded duration-300 hover:bg-white/10 cursor-pointer">
              <img src={assets.arrow_icon} alt="arrow_icon" className="" />
            </div>

            <div className="w-8 h-8 p-2 rounded duration-300 hover:bg-white/10 cursor-pointer">
              <img src={assets.plus_icon} alt="plus_icon" className="" />
            </div>

          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="">Create You First Playlist</h1>
          <p className="font-light">It{"'"} easy, we will help you</p>
          <button className="px-4 py-1.5 bg-white/90 hover:bg-white/70 duration-300 text-[15px] text-black rounded-full mt-4">Create Playlist</button>
        </div>
        <div className="p-4 bg-[#242424] m-2 mt-4 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="">Let{"'"}s Find Some Podcast to Follow</h1>
          <p className="font-light">we{"'"}ll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white/90 hover:bg-white/70 duration-300 text-[15px] text-black rounded-full mt-4">Browse Podcast</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar