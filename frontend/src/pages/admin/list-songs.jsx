import React, { useState } from 'react'
import apiClient from '../../api/api'
import { toast } from 'react-toastify'
import Loading from '../../components/common/Loading'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, X } from 'lucide-react'

const ListSongs = () => {

  const queryClient = useQueryClient();

  const [songId, setSongId] = useState("");
  const { data: songs, isLoading, } = useQuery({
    queryKey: ["listSongs"],
    queryFn: async () => await apiClient.fetchSongs(),
  });


  const { mutate: deleteSongMutation, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteSong"],
    mutationFn: async () => await apiClient.deleteSong(songId),
    onSuccess: () => {
      queryClient.setQueriesData({ queryKey: ["listSongs"] }, (oldSongData) => {
        return oldSongData.filter((song) => song._id !== songId)
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const handleDeleteSong = (songId) => {
        setSongId(songId);
        deleteSongMutation(songId);
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
    <div className="w-full p-5">
      <p>All Songs</p>
      <br />
      <div className="w-full">
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border text-sm bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>

        {
          songs?.length > 0 && songs.map((song) => (
            <div key={song._id} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm ">
              <img src={song.image} alt={song.name} className='w-12 h-12 rounded pointer-events-none' />
              <p className="truncate">{song.name}</p>
              <p className="truncate">{song.album?.name}</p>
              <p className="truncate">{song.duration}</p>
              <button disabled={isDeleting} onClick={() => handleDeleteSong(song._id)} className="w-fit disabled:cursor-not-allowed truncate p-2 rounded hover:bg-gray-200 duration-300 ">
                { isDeleting && song._id === songId
                  ? <LoaderCircle  className='animate-spin w-4 h-4' />
                  : <X className='w-4 h-4 ' />
                }
              </button>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default ListSongs