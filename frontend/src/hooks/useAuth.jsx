import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/api'

const useAuth = () => {

    const { data, isLoading, isPending, refetch, isRefetching,  } = useQuery({
        queryKey: ["user-data"],
        queryFn: async () => await apiClient.getUserData(),
        retry: false
    })

  return { data, isLoading, isPending, refetch, isRefetching,  }
}

export default useAuth