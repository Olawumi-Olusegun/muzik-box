import React, { useState } from 'react'
import apiClient from '../../api/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loading from '../../components/common/Loading'
import { toast } from 'react-toastify'
import { X, LoaderCircle } from "lucide-react"
const ListAlbums = () => {

  const [albumId, setAlbumId] = useState("");
  const queryClient = useQueryClient()

  const { data: albums, isLoading } = useQuery({ 
    queryKey: ["listAlbum"],
    queryFn: async () => await apiClient.fetchAlbums(),
  });

  const { mutate: deleteSongMutation, isPending: isDeleting  } = useMutation({ 
    mutationKey: ["deleteSong"],
    mutationFn: async (albumId) => await apiClient.deleteAlbum(albumId),
    onSuccess: async () => {
      queryClient.setQueriesData(["listAlbum"], (oldAlbums) => {
       return oldAlbums.filter((alb) => alb._id !== albumId)
      })
    },
    onError: () => {
      toast.error("Unable to delete album");
    }
  });


  const handleDeleteSong = (albumId) =>{
    setAlbumId(albumId);
    deleteSongMutation(albumId);
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
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {
          albums.length > 0 && albums.map((album) => (
            <div key={album._id} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm ">
              <img src={album.image} alt={album.name} className='w-12 h-12 rounded pointer-events-none' />
              <p className="truncate">{album.name}</p>
              <p className="truncate">{album.desc}</p>
              <div className='w-10 h-7 rounded-sm' style={{ backgroundColor: album.bgColor }} />
              <button disabled={isDeleting} onClick={() => handleDeleteSong(album._id)} className="w-fit disabled:cursor-not-allowed truncate p-2 rounded hover:bg-gray-200 duration-300 ">
                {
                isDeleting && album._id === albumId
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

export default ListAlbums