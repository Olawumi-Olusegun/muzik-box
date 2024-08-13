import React, { useEffect, useState } from 'react'
import { assets } from '../../../../assets/assets'
import apiClient from '../../../../api/api'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'

const AddSongForm = () => {

  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [album, setAlbum] = useState("none")


  const { data: albums, refetch, isRefetching } = useQuery({
		queryKey: ["listAlbum"],
		queryFn: async () =>  await apiClient.fetchAlbums(),
	});

  const { mutate: addSongMutation, isPending: isLoading } = useMutation({
    mutationFn: async (formData) => await apiClient.addSong(formData),
    onSuccess: () => {
      toast.success("Song Added")
      setName("");
      setDesc("");
      setAlbum("none");
      setImage(false);
      setAudio(null);
    },
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("album", album);
    addSongMutation(formData);

  }

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <>
        <form onSubmit={handleFormSubmit} className="flex flex-col items-start gap-8 text-gray-600 p-5">
            <div className="w-full lg:w-[max(40vw,250px)] flex gap-8  justify-between lg:justify-start">
                <div className="flex flex-col gap-4 w-full">
                    <p>Upload Song</p>
                    <label htmlFor="audio" className='flex items-center justify-center cursor-pointer rounded border-2 border-dashed h-28 w-28'>
                      <img src={assets.spotify_logo} alt="upload-audio-icon" />
                    </label>
                    <input onChange={(event) => setAudio(event.target.files[0])} type="file" id='audio' accept='audio/*' hidden />
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                    <p>Upload Image</p>
                    <label htmlFor="image" className='flex items-center justify-center cursor-pointer rounded border-2 border-dashed h-28 w-28'>
                      <img src={image ? URL.createObjectURL(image) : assets.spotify_logo} alt="upload-image-icon" />
                    </label>
                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' accept='image/*' hidden />
                </div>


            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='name' className="">Song Name:</label>
              <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className='bg-transparent rounded outline-green-600 border-2 border-gray-400 p-2.5 w-full lg:w-[max(40vw,250px)]' placeholder='Song name' />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='desc' value={desc} className="">Song Description:</label>
              <textarea value={desc} rows={4} id="desc" onChange={(event) => setDesc(event.target.value)}  className='resize-y bg-transparent rounded outline-green-600 border-2 border-gray-400 p-2.5 w-full lg:w-[max(40vw,250px)]' placeholder='Song description'></textarea>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='album' className="">Album:</label>
              <select id='album' value={album} onChange={(event) => setAlbum(event.target.value)} className='bg-transparent rounded outline-green-600 border-2 border-gray-400 p-2.5 w-full lg:w-[max(40vw,250px)]' >
                <option value="none">None</option>
                {
                  albums?.length > 0 && albums.map((album) => (
                    <option key={album._id} value={album.name}>{album.name}</option>
                  ))
                }
              </select>
            </div>

            <button type='submit' disabled={isLoading} className='flex disabled:cursor-not-allowed disabled:bg-gray-300 items-center gap-1.5 text-base bg-black rounded-md text-white py-2.5 px-14'>
             {isLoading && <LoaderCircle  className='animate-spin w-4 h-4' /> }  Save
            </button>

            {/* <button type='submit' className='text-base rounded-md bg-black text-white py-2.5 px-14'>Save</button> */}

        </form>
    </>
  )
}

export default AddSongForm