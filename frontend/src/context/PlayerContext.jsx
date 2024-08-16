import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api";


const PlayerContext = createContext();

const PlayerContextProvider = ({children}) => {

    const { data: albumsRespon, isLoading: isAlbumLoading } = useQuery({
        queryKey: ['listAlbum'],
        queryFn: async () => await apiClient.getAlbums()
    });

    const { data: songsRespon, isLoading: isSongLoading, refetch } = useQuery({
        queryKey: ['listSongs'],
        queryFn: async () => await apiClient.fetchSongs(),
    });


    const [track, setTrack] = useState(null);
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            seconds: 0,
            minute: 0,
        },
        totalTime: {
            seconds: 0,
            minute: 0,
        }
    })

    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);
    
    const play = () => {
        audioRef.current?.play();
        setPlayerStatus(true);
    }

    const pause = () => {
        audioRef.current?.pause();
        setPlayerStatus(false);
    }

    const playWithId = async (songId) => {
        if(songId) {
            const findSong = songsRespon.find((item) => item._id === songId);
            if(findSong) {
                await setTrack(findSong);
                await audioRef.current?.play();
                setPlayerStatus(true)
            }
        }
    }

    const previous = async () => {
        if(track._id) {
            const songIndex = songsRespon.findIndex((item) => item._id === track._id);
            if(songIndex === 0) return;
            await setTrack(songsRespon[songIndex - 1])
            await audioRef.current?.play();
            setPlayerStatus(true)

        }
    }

    const next = async () => {

        if(!track?._id) return;

        const songIndex = songsRespon.findIndex((item) => item._id === track._id);

        if((songsRespon && songsRespon.length - 1) > songIndex) {
            await setTrack(songsRespon[songIndex + 1])
            await audioRef.current?.play();
            setPlayerStatus(true)
        }
    }

    const seekSong = async (event) => {
        event.preventDefault();
        if(audioRef.current && seekBg.current) {
            audioRef.current.currentTime = ((event.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
        }
    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        time,
        track,
        setTime,
        setTrack,
        playerStatus,
        setPlayerStatus,
        play,
        pause,
        next,
        previous,
        playWithId,
        seekSong,
        songsData: songsRespon || [],
        albumsData: albumsRespon?.data || [],
        songsRespon,
        albumsRespon,
        isAlbumLoading,
        isSongLoading,
    }

    useEffect(() => {

        if(audioRef.current && seekBar) {
            audioRef.current.ontimeupdate = () => {

                const currentTime = !isNaN(audioRef.current?.currentTime) ? audioRef.current?.currentTime : 0;
                const duration =    !isNaN(audioRef.current?.duration) ? audioRef.current?.duration : 0;

                seekBar.current.style.width = (Math.floor(currentTime/duration * 100)) + "%";

                setTime({
                    currentTime: {
                        seconds: Math.floor(audioRef.current?.currentTime % 60),
                        minute: Math.floor(audioRef.current?.currentTime / 60 ),
                    },
                    totalTime: {
                        seconds: Math.floor(audioRef.current?.duration % 60) ?? 0,
                        minute: Math.floor(audioRef.current?.duration / 60 ) ?? 0,
                    }
                })
            }
        }

    }, [audioRef, seekBar])

    useEffect(() => {
        if (songsRespon && songsRespon.length > 0) {
            setTrack(songsRespon[0] ?? null);
        }
    }, [songsRespon])

    return <PlayerContext.Provider value={contextValue}>
        {children}
    </PlayerContext.Provider>
}

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    return context;
}

export default PlayerContextProvider;