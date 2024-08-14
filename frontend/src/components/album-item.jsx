import React from 'react'
import { Link } from 'react-router-dom'

const AlbumItem = ({image, name, desc, id}) => {
  return (
    <Link to={`/album/${id}`} className='min-w-[180px] w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] duration-300'>
        <img src={image} alt={name} className='rounded cursor-pointer pointer-events-none' />
        <p className="font-bold myt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
    </Link>
  )
}

export default AlbumItem