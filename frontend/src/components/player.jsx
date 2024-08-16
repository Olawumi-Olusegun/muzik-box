import React from 'react'
import { assets } from '../assets/assets'
import { usePlayerContext } from '../context/PlayerContext'

const Player = () => {

  const { seekBar, seekBg, seekSong, play, pause, playerStatus, track, time, previous, next, } = usePlayerContext();

  

  return (
    <div className='fixed z-50 bottom-0 left-0 right-0 w-full min-h-[10%] bg-black/90 flex justify-between items-center text-white/90 px-4 '>
      <div className="hidden lg:flex items-center gap-4 bg-black/90">
        <img src={track.image} alt={track.name} className='w-12 rounded-md pointer-events-none' />
        <div className="">
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex items-center gap-4 ">
          <img src={assets.shuffle_icon} alt="shuffle_icon" className="w-4 cursor-pointer" />
          <img onClick={previous} src={assets.prev_icon} alt="prev_icon" className="w-4 cursor-pointer" />
          {
            playerStatus 
                      ? <img onClick={pause} src={assets.pause_icon} alt="pause_icon" className="w-4 cursor-pointer" />
                      :<img onClick={play} src={assets.play_icon} alt="play_icon" className="w-4 cursor-pointer" />
          }
          <img onClick={next} src={assets.next_icon} alt="next_icon" className="w-4 cursor-pointer" />
          <img src={assets.loop_icon} alt="loop_icon" className="w-4 cursor-pointer" />
        </div>
        <div className="flex items-center gap-5">
          <p className='min-w-12 duration-150'>{time.currentTime.minute}:{time.currentTime.seconds}</p>
          <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer overflow-hidden">
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full overflow-hidden' />
          </div>
          <p className='min-w-12 duration-150'>{time.totalTime.minute || 0}:{time.totalTime.seconds || 0}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img src={assets.plays_icon} alt="plays_icon"  className="w-4 cursor-pointer" />
        <img src={assets.mic_icon} alt="mic_icon"  className="w-4 cursor-pointer" />
        <img src={assets.queue_icon} alt="queue_icon"  className="w-4 cursor-pointer" />
        <img src={assets.speaker_icon} alt="speaker_icon"  className="w-4 cursor-pointer" />
        <div className="w-20 bg-slate-50 h-1 rounded" />
        <img src={assets.volume_icon} alt="volume_icon"  className="w-4 cursor-pointer" />
        <img src={assets.mini_player_icon} alt="mini_player_icon"  className="w-4 cursor-pointer" />
        <img src={assets.zoom_icon} alt="zoom_icon"  className="w-4 cursor-pointer" />
      </div>
    </div>
  )
}

export default Player