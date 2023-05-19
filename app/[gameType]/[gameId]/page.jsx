import { getPlaylistTracks, getArtistTopTracks } from '@/utils/spotifyCalls'
import GameBoard from './GameBoard'
import './game.css'
import '../../css/components/buttons.css'
import '../../css/components/input.css'

const Game = async ({ params }) => {
	const { gameType: type, gameId: id } = params
	let playlist

	const shuffle = (array) => {
		return array.sort(() => 0.5 - Math.random())
	}

	try {
		if (type === 'playlist') {
			playlist = await getPlaylistTracks(id)
			playlist = shuffle(playlist)
		} else if (type === 'artist') {
			playlist = await getArtistTopTracks(id)
			playlist = shuffle(playlist)
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
			<GameBoard playlist={playlist} type={type} />
		</div>
	)
}

export default Game
