
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import apiClient from '../../api/api';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../components/common/Loading';

const ProtectedRoute = () => {

    const { data: userData, isLoading, } = useQuery({ 
      queryKey: ["user-data"],
      queryFn: async () => await apiClient.getUserData(),
     })

    if(isLoading) {
        return <Loading />
    }
    
    return userData ? <Outlet /> : <Navigate to={"/signin"} replace={true} />
}

export default ProtectedRoute