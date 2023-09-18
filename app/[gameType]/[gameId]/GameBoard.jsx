'use client'
import { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { statsAtom } from './gameAtoms'
import useSpotify from '@/hooks/useSpotify'
import useDebounce from '@/hooks/useDebounce'
import Search from './Search'
import MusicPlayer from './MusicPlayer'
import { SkipButton, NextLevelButton } from './GameButtons'
import EndScreen from './EndScreen'
import gameOver from './gameOver'

const GameBoard = ({ playlist, tracks, type }) => {
	const [statistics, setStatistics] = useAtom(statsAtom)
	const [gameStatus, setGameStatus] = useState({
		levelEnded: false,
		levelOutcome: '',
		levelScore: '',
		gameEnded: false,
	})

	const [level, setLevel] = useState(0)
	const currentSong = type === 'playlist' ? tracks[level].track : tracks[level]

	const [stage, setStage] = useState({
		number: 1,
		seconds: [1, 2, 4, 7, 11, 16],
	})

	const score = [600, 500, 400, 300, 200, 100]
	const currentScore = score[stage.number - 1]

	const [guesses, setGuesses] = useState([
		{
			number: 1,
			value: '',
		},
		{
			number: 2,
			value: '',
		},
		{
			number: 3,
			value: '',
		},
		{
			number: 4,
			value: '',
		},
		{
			number: 5,
			value: '',
		},
		{
			number: 6,
			value: '',
		},
	])

	const gameInput = useRef()

	const spotifyApi = useSpotify()

	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const [searchResults, setSearchResults] = useState(null)

	const getSearch = async (query) => {
		try {
			const data = await spotifyApi.searchTracks(query, { limit: 5 })
			setSearchResults(data.body.tracks.items)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!search) return setSearchResults(null)
		getSearch(search)
	}, [debouncedSearch])

	const resetGame = (type) => {
		setSearch('')

		guesses.map((guess) => {
			guess.value = ''
			delete guess.skipped
		})

		setStage({
			...stage,
			number: 1,
		})

		setGameStatus({
			levelEnded: false,
			levelOutcome: '',
			levelScore: '',
		})

		if (type === 'level') {
			setLevel(0)
		}
	}

	const handleFinalScore = () => {
		setGameStatus({
			...gameStatus,
			gameEnded: true,
		})
	}

	const handleNextLevel = () => {
		if (gameStatus.levelEnded === false) {
			const [newStatus, newStatistics] = gameOver({
				outcome: 'lost',
				currentScore,
				statistics,
			})
			setGameStatus(newStatus)
			setStatistics(newStatistics)
		} else {
			setLevel((prev) => prev + 1)
		}
	}

	const handleNextStage = ({ type, event, id, name, artists }) => {
		// console.log(artists)
		// WHY I ARTISTS UNDEFINED?
		// no duplicate guesses

		if (type === 'guess') {
			event.preventDefault()

			if (id === currentSong.id) {
				const [newStatus, newStatistics] = gameOver({
					outcome: 'won',
					currentScore,
					statistics,
				})
				setGameStatus(newStatus)
				setStatistics(newStatistics)
			} else if (guesses.find((guess) => guess.id === id)) {
				console.log('duplicate')
			} else {
				const currentGuess = guesses.find(
					(guess) => guess.number === stage.number
				)
				// currentGuess.value = `${name} - ${artists.map(artist => artist.name).join(', ')}`
				currentGuess.value = name
				currentGuess.id = id

				// remove debounce
				setSearch('')
				gameInput.current.value = ''

				setGuesses([...guesses])

				if (stage.number >= 6) {
					const [newStatus, newStatistics] = gameOver({
						outcome: 'lost',
						currentScore,
						statistics,
					})
					setGameStatus(newStatus)
					setStatistics(newStatistics)
				}

				const newStage = stage.number + 1
				setStage({
					...stage,
					number: newStage,
				})
			}
		}

		if (type === 'skipped') {
			const currentGuess = guesses.find(
				(guess) => guess.number === stage.number
			)
			currentGuess.value = 'Skipped'
			currentGuess.skipped = true

			if (stage.number >= 6) {
				const [newStatus, newStatistics] = gameOver({
					outcome: 'lost',
					currentScore,
					statistics,
				})
				setGameStatus(newStatus)
				setStatistics(newStatistics)
			}

			const newStage = stage.number + 1
			setStage({
				...stage,
				number: newStage,
			})
		}
	}

	const handleSearchInputChange = (event) => {
		setSearch(event.target.value)
	}

	return (
		<div className="game">
			<div className="game__main">
				{gameStatus.levelEnded || gameStatus.gameEnded ? (
					<EndScreen
						gameEnded={gameStatus.gameEnded}
						playlist={playlist}
						levelOutcome={gameStatus.levelOutcome}
						seconds={stage.seconds[stage.number - 1]}
						image={currentSong.album.images[0]}
						title={currentSong.name}
						artists={currentSong.artists}
						release={currentSong.album.release_date.slice(0, 4)}
					/>
				) : (
					<>
						<div className="game__score">
							<div>Song: {level + 1}/10</div>
							<div>Score: {currentScore}</div>
							<div>High Score: {statistics.highScore}</div>
						</div>
						<Search
							ref={gameInput}
							// search={search}
							// setSearch={setSearch}
							searchResults={searchResults}
							handleSearchInputChange={handleSearchInputChange}
							handleNextStage={handleNextStage}
						></Search>
						<div className="game__guesses">
							{guesses.map(({ number, value, skipped }) => (
								<div key={number}>
									{number}.{' '}
									<span
										style={
											skipped ? { color: 'var(--color-primary-500)' } : null
										}
									>
										{value}
									</span>
								</div>
							))}
						</div>
						{!gameStatus.gameEnded && (
							<MusicPlayer
								currentSongUrl={currentSong.preview_url}
								stage={stage}
								levelEnded={gameStatus.levelEnded}
							/>
						)}
					</>
				)}
			</div>
			<div className="game__buttons">
				<SkipButton
					stage={stage}
					handleNextStage={handleNextStage}
					levelEnded={gameStatus.levelEnded}
					gameEnded={gameStatus.gameEnded}
					currentSongSpotifyLink={currentSong.external_urls.spotify}
				/>
				<NextLevelButton
					handleNextLevel={handleNextLevel}
					level={level}
					levelEnded={gameStatus.levelEnded}
					gameEnded={gameStatus.gameEnded}
					handleFinalScore={handleFinalScore}
					resetGame={resetGame}
				/>
			</div>
		</div>
	)
}

export default GameBoard
