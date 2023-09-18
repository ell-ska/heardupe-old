import {
	getPlaylist,
	getArtist,
	getArtistTopTracks,
} from '@/utils/spotifyCalls'
import GameBoard from './GameBoard'
import './game.css'
import '../../css/components/buttons.css'
import '../../css/components/input.css'

const Game = async ({ params }) => {
	const { gameType: type, gameId: id } = params
	let playlist, tracks

	const shuffle = (array) => {
		return array.sort(() => 0.5 - Math.random())
	}

	try {
		if (type === 'playlist') {
			playlist = await getPlaylist(id)
			tracks = shuffle(playlist.tracks.items)
		} else if (type === 'artist') {
			;[playlist, tracks] = await Promise.all([
				getArtist(id),
				getArtistTopTracks(id),
			])
			tracks = shuffle(tracks)
		} else {
			throw { body: 'Not an avaliable type' }
		}
	} catch (error) {
		console.log(error.body)
	}

	return <GameBoard playlist={playlist} tracks={tracks} type={type} />
}

export default Game
