import Image from 'next/image'

const EndScreen = ({
	gameEnded,
	playlist,
	levelOutcome,
	seconds,
	image,
	title,
	artists,
	release,
}) => {
	const exclamation = levelOutcome === 'won' ? 'Amazing!' : 'You lost!'
	const message =
		levelOutcome === 'won'
			? `You got the song from ${seconds} seconds`
			: "You can't know them all..."

	const LevelEndedScreen = () => {
		return (
			<div className="level-ended">
				<h3>{exclamation}</h3>
				<span>{message}</span>
				<Image
					src={image.url}
					width={image.width}
					height={image.height}
					alt={`album cover for ${title}`}
				></Image>
				<h4 className="level-ended__song">{title}</h4>
				<span className="level-ended__artist">
					{artists.map((artist) => artist.name).join(', ')}
				</span>
				<span className="level-ended__year">{release}</span>
			</div>
		)
	}

	const GameEndedScreen = () => {
		return (
			<div className="game-ended">
				<div className="game-ended__image">
					<Image
						src={playlist.images[0].url}
						width={playlist.images[0].width}
						height={playlist.images[0].height}
						alt={`cover image from the playlist ${playlist.name}`}
					></Image>
				</div>
				<div className="game-ended__content">
					<h3>Good job!</h3>
					<h2>{playlist.name}</h2>
					<div className="game-ended__scores">
						<h4>
							Score: <span>1 300</span>
						</h4>
						<span>|</span>
						<h4>
							High Score: <span>5 400</span>
						</h4>
					</div>
				</div>
			</div>
		)
	}

	return gameEnded ? <GameEndedScreen /> : <LevelEndedScreen />
}

export default EndScreen
