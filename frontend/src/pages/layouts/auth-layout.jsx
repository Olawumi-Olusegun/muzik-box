import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/common/Loading';

const AuthLayout = () => {
  
  const { data: userData, isLoading,  } = useAuth();

  if(isLoading) {
    return <Loading />
  }


  return  userData ? <Navigate to={"/"} />  : <Outlet />
}

export default AuthLayout