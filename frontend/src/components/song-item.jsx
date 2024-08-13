import React from 'react'
import { Link } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'

export const SongItem = ({image, name, id}) => {

  const { playWithId } = usePlayerContext();

    return (
      <div onClick={() => playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] duration-300'>
          <img src={image} alt={name} className='rounded cursor-pointer pointer-events-none' />
          <p className="font-bold myt-2 mb-1">{name}</p>
      </div>
    )
  }
