import axios from "axios"

const baseUrl = "/api/v1";

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
}

export default apiClient;