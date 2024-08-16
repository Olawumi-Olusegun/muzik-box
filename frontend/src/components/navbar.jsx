import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/api';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: async () => await apiClient.signOut(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/signin", {replace: true})
      return;
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const { data: userData } = useAuth();

  const handleLogOut = () => signOutMutation();

  return (
    <>
    <div className='flex items-center justify-between font-semibold'>
        <div className="flex items-center gap-2">
            <img onClick={() => navigate(-1)} src={assets.arrow_left} alt="arrow_left" className='w-8 bg-black/90 hover:bg-black/30 duration-300 p-2 rounded-2xl cursor-pointer' />
            <img onClick={() => navigate(1)} src={assets.arrow_right} alt="arrow_right" className='w-8 bg-black/90 hover:bg-black/30 duration-300 p-2 rounded-2xl cursor-pointer' />
        </div>
        <div className="flex items-center gap-3">
            <button className="bg-white/90 hover:bg-white/80 duration-300 text-black/90 text-[15px] px-4 py-2 rounded-full hidden md:block cursor-pointer">Explore Premium</button>
            <button className="bg-black/90 hover:bg-black/30 duration-300 text-white text-[15px] px-4 py-2 rounded-full hidden md:block cursor-pointer">Install App</button>
            <button onClick={handleLogOut} className="bg-purple-500 cursor-pointer text-black w-7 h-7 rounded-full flex items-center justify-center">
              {userData?.fullName?.charAt(0) ?? "A"}
            </button>
        </div>
    </div>

    <div className="flex items-center gap-2 mt-4">
        <p className="bg-white/90 hover:bg-white/70 duration-300 text-black/90 px-4 py-1.5 rounded-full cursor-pointer">All</p>
        <p className="bg-black/90 hover:bg-black/30 duration-300 cursor-pointer px-4 py-1.5 rounded-full ">Music</p>
        <p className="bg-black/90 hover:bg-black/30 duration-300 cursor-pointer px-4 py-1.5 rounded-full ">Podcast</p>
    </div>
    </>
  )
}

export default Navbar