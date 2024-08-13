import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './display-home'
import DisplayAlbum from '../pages/display-album'
import { albumsData } from '../assets/assets'
import DisplaySong from '../pages/display-song'

const Display = () => {

  // const location = useLocation();
  // const dispalyRef = useRef(null);

  // const isAlbum = location.pathname.includes("album");

  // const albumId = isAlbum ? location.pathname.slice(-1) : "";

  // const bgColor = albumsData[Number(albumId)].bgColor;
  

  // useEffect(() => {
  //   if(isAlbum && dispalyRef.current) {
  //     dispalyRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
  //   }else {
  //     dispalyRef.current.style.background = `#121212`;
  //   }
  // }, [location])

  return (
    // <div ref={dispalyRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white/90 overflow-auto lg:w-[75%] lg:ml-0'>
    //     <Routes>
    //         <Route path='/' element={<DisplayHome />} />
    //         <Route path='/album/:albumId' element={<DisplayAlbum />} />
    //         <Route path='/song/:songId' element={<DisplaySong />} />
    //     </Routes>
    // </div>
    <h2>Welcome</h2>
  )
}

export default Display