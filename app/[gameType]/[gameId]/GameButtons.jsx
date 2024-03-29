import Link from 'next/link'

const SkipButton = ({
	stage,
	handleNextStage,
	levelEnded,
	gameEnded,
	currentSongSpotifyLink,
}) => {
	const ListenOnSpotify = () => {
		return (
			<Link
				href={currentSongSpotifyLink}
				className="button"
				target="_blank"
				rel="noopener noreferrer"
			>
				Listen on Spotify
			</Link>
		)
	}

	const Skip = () => {
		return (
			<button
				className="button"
				onClick={() => handleNextStage({ type: 'skipped' })}
			>
				Skip {stage.number < 6 ? `(+${stage.number}s)` : null}
			</button>
		)
	}

	const Home = () => {
		return (
			<Link href="/" className="button">
				Home
			</Link>
		)
	}

	return levelEnded && !gameEnded ? (
		<ListenOnSpotify />
	) : gameEnded ? (
		<Home />
	) : (
		<Skip />
	)
}

const NextLevelButton = ({
	handleNextLevel,
	level,
	levelEnded,
	gameEnded,
	handleFinalScore,
	resetGame,
}) => {
	const FinalScore = () => {
		return (
			<button className="button button--outline" onClick={handleFinalScore}>
				Final score
			</button>
		)
	}

	const NextSong = () => {
		return (
			<button className="button button--outline" onClick={handleNextLevel}>
				{!levelEnded ? 'Reveal answer' : 'Next song'}
			</button>
		)
	}

	const PlayAgain = () => {
		return (
			<button
				className="button button--outline"
				onClick={() => resetGame('level')}
			>
				Play again
			</button>
		)
	}

	return gameEnded ? (
		<PlayAgain />
	) : level === 9 && levelEnded ? (
		<FinalScore />
	) : (
		<NextSong />
	)
}

export { SkipButton, NextLevelButton }
