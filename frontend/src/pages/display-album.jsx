import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {  assets, } from '../assets/assets';
import { usePlayerContext } from '../context/PlayerContext';
import Loading from '../components/common/Loading';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/api';

const DisplayAlbum = () => {

  const { albumId } = useParams();

  const { playWithId } = usePlayerContext();

  const { data: albumData, isLoading: isAlbumLoading, isRefetching } = useQuery({
    queryKey: ["single-album", albumId],
    queryFn: async () => await apiClient.fetchAlbum(albumId),
    enabled: !!albumId,
  });


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])


  if(isAlbumLoading || isRefetching) return <Loading />
  if(!albumData) return null;


  return (
    <>
    <div className="my-10 flex gap-8 flex-col md:flex-row md:items-end">
      <img src={albumData?.image} alt={albumData.name} className='rounded-md pointer-events-none' />
      <div className="flex flex-col">
        <p className="">Playlist</p>
        <h2 className='text-5xl font-bold mb-4 md:text-7xl line-clamp-2'>{albumData.name}</h2>
        <h4 className="line-clamp-3">{albumData.desc}</h4>
        <div className="mt-1 flex items-center gap-1.5">
          <img src={assets.spotify_logo} alt="spotify_logo" className='inline-block w-5' />
          <b>Spotify</b>
          <span>.1323 likes,</span>
          <b>.50 songs,</b> about 2 hrs 30min
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
      <p className="">
        <b className='mr-4'>#</b>
        <span>Title</span>
      </p>
      <p className="">Album</p>
      <p className="hidden sm:block">Date Added</p>
      <img src={assets.clock_icon} alt="clock_icon" className='m-auto w-4' />
    </div>
    <hr />
    {
     albumData.albumSongs?.length > 0 && albumData.albumSongs?.map((song, index) => (
        <div onClick={() => playWithId(song._id)} key={song._id} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] duration-300 cursor-pointer ">
          <p className="text-white/90">
            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
            <img src={song.image} alt={song.name} className='inline w-10 mr-5 rounded-sm' />
          </p>
          <p className='text-[15px]'>{song.name}</p>
          <p className='text-[15px] hidden sm:block'>5 days ago</p>
          <p className='text-[15px] text-center'>{song.duration}</p>
        </div>
      ))
    }
    </>
  )
}

export default DisplayAlbum