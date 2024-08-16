import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/common/Loading'


const AdminLayout = () => {

  const { data: userData, isLoading,  } = useAuth();

  if(isLoading) {
    return <Loading />
  }

  return userData && userData?.isAdmin ? <Outlet /> : <Navigate to={"/"} />
}

export default AdminLayout