import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import Player from '../../components/player'
import { usePlayerContext } from '../../context/PlayerContext'
import { albumsData } from '../../assets/assets'
import Navbar from '../../components/navbar'

const MainLayout = () => {

  const { audioRef, track } = usePlayerContext();

  const location = useLocation();
  const displayRef = useRef(null);

  const isAlbum = location.pathname.includes("album");

  // const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const albumId = isAlbum ? location.pathname.split("/") : "";

  const bgColor = albumsData[Number(albumId)].bgColor;
  

  useEffect(() => {
    if(isAlbum && displayRef.current) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }else {
      displayRef.current.style.background = `#121212`;
    }
  }, [location])

  return (
    <>
    <div ref={displayRef} className="relative w-full min-h-dvh pb-20 bg-[#121212] flex justify-between rounded  text-white/90">
          <div className="hidden bg-[#121212] lg:block lg:w-80 fixed top-0 left-0 h-screen">
            <Sidebar />
          </div>
          <main className='w-full px-6 ml-0 my-5 lg:ml-80 lg:w-[calc(100%_-_20rem)] '>
            <Navbar />
            <Outlet />
          </main>
          {track ? <Player /> : null }
        <audio src={track ? track.file : ""} ref={audioRef} preload="auto"></audio>
    </div>
    </>
  )
}

export default MainLayout