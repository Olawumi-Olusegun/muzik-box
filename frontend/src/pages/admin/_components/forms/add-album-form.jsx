import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { assets } from '../../../../assets/assets'
import apiClient from '../../../../api/api';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

const AddAlbumForm = () => {

    const [image, setImage] = useState(null);
    const [bgColor, setBgColor] = useState("#003a10");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const { mutate: albumMutation, isPending: isLoading } = useMutation({
      mutationFn: async (formData) => await apiClient.addAlbum(formData),
      onSuccess: () => {
        toast.success("Album Added");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    })


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("image", image);
        formData.append("bgColor", bgColor);

        albumMutation(formData)

        setName('');
        setDesc('');
        setImage(null);
        setBgColor("#003a10")
    }

  return (
    <>
        <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-start gap-8 text-gray-600 p-5">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <strong>Upload Album Image</strong>
                    <label htmlFor="image" className='flex items-center justify-center cursor-pointer rounded border-2 border-dashed p-5 h-28 w-28'>
                      <img src={image ? URL.createObjectURL(image) : assets.spotify_logo} alt="upload-image-icon" />
                    </label>
                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' accept='image/*' hidden />
                </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='name' className="">Album Name:</label>
              <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className='bg-transparent rounded outline-green-600 border-2 border-gray-400 p-2.5 lg:w-[max(40vw,250px)]' placeholder='Album name' />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='desc' className="">Album Description:</label>
              <textarea rows={4} id="desc" value={desc} onChange={(event) => setDesc(event.target.value)}  className='resize-y bg-transparent rounded outline-green-600 border-2 border-gray-400 p-2.5  lg:w-[max(40vw,250px)]' placeholder='Album description'></textarea>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor='bgColor' className="w-fit">Background Color:</label>
              <input type="color" id="bgColor" value={bgColor} onChange={(event) => setBgColor(event.target.value)} className='bg-transparent overflow-hidden outline-green-600 h-10 ' />
            </div>

            <button type='submit' disabled={isLoading} className='flex disabled:cursor-not-allowed disabled:bg-gray-300 items-center gap-1.5 text-base bg-black rounded-md text-white py-2.5 px-14'>
             {isLoading && <LoaderCircle  className='animate-spin w-4 h-4' /> }  Save
            </button>

        </form>
    </>
  )
}

export default AddAlbumForm