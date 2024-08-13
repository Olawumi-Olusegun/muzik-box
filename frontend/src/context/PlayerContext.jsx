import { createContext, useContext, useEffect, useRef, useState } from "react";
import apiClient from "../api/api";
import { toast } from "react-toastify";


const PlayerContext = createContext();

const PlayerContextProvider = ({children}) => {

    const [songsData, setSongData] = useState([])
    const [albumsData, setAlbumsData] = useState([])

    const [track, setTrack] = useState(songsData[0]);
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
            await setTrack(songsData[songId])
            await audioRef.current?.play();
            setPlayerStatus(true)
        }
    }

    const previous = async () => {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current?.play();
            setPlayerStatus(true)
        }
    }

    const next = async () => {
        if(track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
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


    const getSongAndAlbumData = async () => {
        try {
            const songPromise = apiClient.fetchSongs();
            const albumPromise = apiClient.getAlbums();
            const [songData, albumData] = await Promise.all([songPromise, albumPromise]);
            setSongData(songData)
            setAlbumsData(albumData)
            setTrack(songData[0])
        } catch (error) {
            toast.error(error?.message)
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
        songsData,
        albumsData,
    }

    useEffect(() => {

        if(audioRef.current && seekBar.current) {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration * 100)) + "%";
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

    }, [audioRef])

    useEffect(() => {
        getSongAndAlbumData()
    }, [])

    return <PlayerContext.Provider value={contextValue}>
        {children}
    </PlayerContext.Provider>
}

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    return context;
}

export default PlayerContextProvider;