import axios from "axios"

const baseUrl = "/api/v1";
axios.defaults.withCredentials = true

export const addSong = async (formData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/song`, formData)
        return data;
    } catch (error) {
        throw error
    }
}

export const fetchSongs = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/song`)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const fetchSong = async (songId) => {
    try {
        const { data } = await axios.get(`${baseUrl}/song/${songId}`)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const deleteSong = async (songId) => {
    try {
        const { data } = await axios.delete(`${baseUrl}/song/${songId}`)
        return data;
    } catch (error) {
        throw error
    }
}

export const addAlbum = async (formData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/album`, formData)
        return data;
    } catch (error) {
        throw error
    }
}

export const fetchAllAlbum = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/album/all`)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const fetchAlbums = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/album`)
        return data?.data;
    } catch (error) {
        throw error
    }
}


export const fetchAlbum = async (songId) => {
    try {
        const { data } = await axios.get(`${baseUrl}/album/${songId}`)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const deleteAlbum = async (albumId) => {
    try {
        const { data } = await axios.delete(`${baseUrl}/album/${albumId}`)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const getAlbums = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/album`)
        return data;
    } catch (error) {
        throw error
    }
}

// auth => signIn, signUp, signOut

export const signIn = async (formData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/signin`, formData)
        return data?.data;
    } catch (error) {
        throw error
    }
}

export const signUp = async (formData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/signup`, formData)
   
        return data?.data;
    } catch (error) {
        // console.log("API ERROR", error)
        throw error
    }
}

export const signOut = async () => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/signout`)
        return data?.data;
    } catch (error) {
        throw error
    }
}



export const getUserData = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/auth/me`, {
            method: "GET",
        })
        return data?.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const apiClient = {
    addSong,
    fetchSongs,
    deleteSong,
    addAlbum,
    getAlbums,
    fetchAlbums,
    deleteAlbum,
    fetchAlbum,
    fetchSong,
    fetchAllAlbum,
    signIn,
    signUp,
    signOut,
    getUserData
}

export default apiClient;