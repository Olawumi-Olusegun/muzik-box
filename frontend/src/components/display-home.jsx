import React from 'react'
import AlbumItem from './album-item'
import { SongItem } from './song-item'
import { usePlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {

  const { songsData, albumsData } = usePlayerContext();

  return (
    <>
    <div className="my-5  w-full h-full">
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
          <div className="flex overflow-auto">
            {albumsData?.map((album) => (
              <AlbumItem 
              key={album._id} 
              id={album._id} 
              name={album.name} 
              desc={album.desc} 
              image={album.image} 
              />
            ))}
          </div>
        </div>


        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today{"'"}s biggest hit</h1>
          <div className="flex overflow-auto">
            {songsData?.map((album) => (
              <SongItem 
              key={album._id} 
              id={album._id} 
              name={album.name} 
              desc={album.desc} 
              image={album.image} 
              />
            ))}
          </div>
        </div>

    </div>
    </>
  )
}

export default DisplayHome