import { getPlaylistTracks, getArtistTopTracks } from '@/utils/spotifyCalls'
import GameBoard from './GameBoard'
import MusicPlayer from './MusicPlayer'
import './game.css'
import '../../css/components/buttons.css'
import '../../css/components/input.css'

const Game = async ({ params }) => {
	const { gameType: type, gameId: id } = params
	let playlist

	try {
		if (type === 'playlist') {
			playlist = await getPlaylistTracks(id)
		} else if (type === 'artist') {
			playlist = await getArtistTopTracks(id)
		} else {
			throw { body: 'Not an avaliable type' }
		}
	} catch (error) {
		console.log(error.body)
	}

	// console.log(playlist[0].track.name)
	// console.log(playlist[0].track.artists[0].name)
	// console.log(playlist[0].track.album.images[0])
	// console.log(playlist[0].track.album.release_date)
	// console.log(playlist[0].track.preview_url)
	// console.log(playlist[0].track.external_urls.spotify)

	return (
		<div className="main">
			{/* <GameBoard
				currentSongTitle={currentSongTitle}
				currentArtistName={currentArtistName}
				currentSongImage={currentSongImage}
				currentSongReleaseDate={currentSongReleaseDate}
			></GameBoard>
			<MusicPlayer
				currentSongUrl={currentSongUrl}
				currentSongSpotifyLink={currentSongSpotifyLink}
			></MusicPlayer> */}
		</div>
	)
}

export default Game
