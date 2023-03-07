"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { useAtom } from "jotai"
import { stageAtom } from "./gameAtoms"
import playIcon from "../../public/play.svg"
import pauseIcon from "../../public/pause.svg"
import './music-player.css'

const MusicPlayer = ({ currentSongUrl }) => {
    // https://www.youtube.com/watch?v=sqpg1qzJCGQ

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(16)
    const [currentDisplayTime, setCurrentDisplayTime] = useState(0)
    
    const [stage, setStage] = useAtom(stageAtom)

    const stageSeconds = [1, 2, 4, 7, 11, 16]
    const secondsToPlay = stageSeconds[stage - 1]

    const audio = useRef()
    const progressBar = useRef()
    const animation = useRef()

    const stopAtCurrentStage = () => {
        if (audio.current.currentTime >= secondsToPlay) {

            audio.current.pause()
            cancelAnimationFrame(animation.current)
            setIsPlaying(false)

            progressBar.current.value = 0
            updateProgressBar()

            audio.current.currentTime = 0
        }
    }

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevIsPlaying = isPlaying
        setIsPlaying(!prevIsPlaying)
        
        if (!prevIsPlaying) {
            audio.current.play()
            animation.current = requestAnimationFrame(updateProgressBarWhilePlaying)
        } else {
            audio.current.pause()
            cancelAnimationFrame(animation.current)
        }
    }

    const updateProgressBar = () => {
        progressBar.current.style.setProperty('--duration-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentDisplayTime(progressBar.current.value)
    }

    const updateProgressBarWhilePlaying = () => {
        progressBar.current.value = audio.current.currentTime
        updateProgressBar()
        animation.current = requestAnimationFrame(updateProgressBarWhilePlaying)
    }

    const changeTimeWithProgressBar = () => {
        audio.current.currentTime = progressBar.current.value
        updateProgressBar()
    }

    return (
        <div className="game-footer">
            <button
                className='button'
                onClick={() => setStage(prev => prev + 1)}
            >Skip (+{stage}s)</button>
            <div className="music-player">
                <audio
                    ref={audio}
                    src={currentSongUrl}
                    onTimeUpdate={stopAtCurrentStage}
                ></audio>
                <button className="music-player__button" onClick={togglePlayPause}>
                    {isPlaying ? (
                        <Image src={pauseIcon} alt="pause"></Image>
                    ) : (
                        <Image src={playIcon} alt="play" style={{marginLeft: '3px'}}></Image>
                    )}
                </button>
                <div className="progress">
                    <div className="progress__current">{calculateTime(currentDisplayTime)}</div>
                    <input
                        ref={progressBar}
                        className="progress__bar"
                        type="range"
                        defaultValue="0"
                        max={16}
                        onChange={changeTimeWithProgressBar}
                        />
                    <div className="progress__duration">00:16</div>
                </div>
            </div>
            <button className='button--outline'>Next song</button>
        </div>
    )
}

export default MusicPlayer