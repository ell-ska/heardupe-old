import Image from 'next/image'

const WinnerScreen = ({ outcome, seconds, image, title, name, release }) => {
	const exclamation = outcome === 'won' ? 'Amazing!' : 'You lost!'
    const message = outcome === 'won' ? `You got the song from ${seconds} seconds` : "You can't know them all..."

	return (
		<div className="game-over">
			<h3>{exclamation}</h3>
			<span>{message}</span>
			<Image
				src={image.url}
				width={image.width}
				height={image.height}
				alt={`image of ${name}`}
			></Image>
			<h4 className="game-over__song">{title}</h4>
			<span className="game-over__artist">{name}</span>
			<span className="game-over__year">{release}</span>
		</div>
	)
}

export default WinnerScreen
