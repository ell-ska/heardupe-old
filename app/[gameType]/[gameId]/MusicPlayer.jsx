'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { stageAtom, gameStatusAtom, statsAtom } from './gameAtoms'
import gameOver from './gameOver'
import playIcon from 'public/play.svg'
import pauseIcon from 'public/pause.svg'
import './music-player.css'

const MusicPlayer = ({ currentSongUrl, currentSongSpotifyLink }) => {
	// https://www.youtube.com/watch?v=sqpg1qzJCGQ

	const [gameStatus, setGameStatus] = useAtom(gameStatusAtom)
	const [statistics, setStatistics] = useAtom(statsAtom)
	const [stage, setStage] = useAtom(stageAtom)

    const secondsToPlay = gameStatus.gameOver ? stage.seconds.at(-1) : stage.seconds[stage.number - 1]
	const stagePercentages = [6.25, 12.5, 25, 43.75, 68.75, 100]
    const unlockedStagePercentage = gameStatus.gameOver ? stagePercentages.at(-1) : stagePercentages[stage.number - 1]

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentDisplayTime, setCurrentDisplayTime] = useState(0)
	const [progressWidth, setProgressWidth] = useState(0)

	const audio = useRef()
	const animation = useRef()

	const stopAtCurrentStage = () => {
		audio.current.pause()
		cancelAnimationFrame(animation.current)
		setIsPlaying(false)

		setProgressWidth(0)
		audio.current.currentTime = 0
		setCurrentDisplayTime(0)
	}

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60)
		const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
		const seconds = Math.floor(secs % 60)
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		return `${returnedMinutes}:${returnedSeconds}`
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

	const updateProgressBarWhilePlaying = () => {
        const newWidth = Math.floor((audio.current.currentTime * 100) / secondsToPlay)

		setCurrentDisplayTime(audio.current.currentTime)
		setProgressWidth(newWidth)

		if (audio.current.currentTime >= secondsToPlay) {
			stopAtCurrentStage()
			return
		}

		animation.current = requestAnimationFrame(updateProgressBarWhilePlaying)
	}

	return (
		<div className="game-footer">
			{gameStatus.gameOver ? (
				<Link href={currentSongSpotifyLink}>
					<button className="button">Listen on Spotify</button>
				</Link>
			) : (
				<button
					className="button"
					onClick={() => {
						const newStage = stage.number + 1
						setStage({
							...stage,
							number: newStage,
						})

						if (stage.number >= 6) {
                            const [newStatus, newStatistics] = gameOver('lost', 100, statistics)
							setGameStatus(newStatus)
							setStatistics(newStatistics)
						}
					}}
                >Skip {stage.number < 6 ? `(+${stage.number}s)` : null}</button>
			)}
			<div className="music-player">
				<div className="music-player__inner">
					<audio ref={audio} src={currentSongUrl}></audio>
					<button className="music-player__button" onClick={togglePlayPause}>
						{isPlaying ? (
							<Image src={pauseIcon} alt="pause"></Image>
						) : (
							<Image src={playIcon} alt="play"></Image>
						)}
					</button>
					<div className="progress">
						<div className="progress__current">
							{calculateTime(currentDisplayTime)}
						</div>
						<div className="bar">
							<div className="bar__back">
								<div className="bar__line"></div>
								<div className="bar__line"></div>
								<div className="bar__line"></div>
								<div className="bar__line"></div>
								<div className="bar__line"></div>
							</div>
                            <div className="bar__unlocked" style={{ width: `${unlockedStagePercentage}%` }}>
                                <div className="bar__current" style={{ width: `${progressWidth}%` }}></div>
							</div>
						</div>
						<div className="progress__duration">00:16</div>
					</div>
				</div>
			</div>
			<button className="button button--outline">Next song</button>
		</div>
	)
}

export default MusicPlayer
