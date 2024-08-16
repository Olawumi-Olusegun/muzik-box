import React from 'react'
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import apiClient from '../../api/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';



const SignIn = () => {

  const navigate = useNavigate();

 const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm({
            defaultValues: {
              email: "",
              password: "",
            }
        })

        const { mutate: signInMutation, isPending, } = useMutation({
          mutationFn: async (formData) => await apiClient.signIn(formData),
          onSuccess: async () => {
            reset();
            navigate("/")
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
          }
        })

    const disabled = isPending || !isValid;

    const onSubmit = (data) => {
        if(isPending) return;
        signInMutation(data)
      }

  return (
    <section className="bg-white h-dvh w-full max-w-full flex flex-col md:flex-row items-start justify-center">
      <div className="hidden md:block md:w-96 bg-blue-600 h-full"></div>
      <div className="flex-1 flex flex-col items-center justify-center h-full gap-5 p-12 px-5 lg:p-12 w-full">
        <h2 className="font-bold text-4xl w-full">Welcome back!</h2>
        
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
             
              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder='johndoe@mail.com' 
                className='border px-4 py-2 rounded text-gray-700'
                {...register("email", { 
                  required: "Email is required",
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                  })}  
                  />
                { errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span> }
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder='**********'
                  autoComplete='off'
                  className='border px-4 py-2 rounded text-gray-700'
                {...register("password", { 
                  required: "Password is required", 
                  minLength: {
                    value: 6,
                    message: "Minimum of 6 characters is required"
                  },
                  })}  />
                { errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span> }
              </div>

             
            </div>

            <div className="flex items-center gap-1.5 w-full mt-3">
              <span className='text-gray-600'>Dont{"'"} have an account?</span>
              <Link to={"/signup"} className='text-blue-500 underline underline-offset-4 text-sm'>SignUp</Link>
            </div>

            <div className="w-full my-10 ">
              <button disabled={disabled} className='w-full font-semibold disabled:cursor-not-allowed px-4 py-2 rounded bg-black text-white flex items-center justify-center gap-1.5'>
                { isPending && <Loader2 className="h-4 w-4 text-white animate-spin" /> }
                <span>SIGN IN TO YOUR ACCOUNT</span>
              </button>
            </div>


        </form>
        
      </div>
    </section>
  )
}

export default SignIn