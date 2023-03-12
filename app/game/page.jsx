import GameBoard from './GameBoard'
import MusicPlayer from './MusicPlayer'
import fetchArtist from '../fetchArtist'
import './game.css'
import '../css/components/buttons.css'
import '../css/components/input.css'

const fetchTopTracks = async (name) => {
	const artist = await fetchArtist(name)
	return await fetchArtist(`${artist.artists.items[0].id}/top-tracks`)
}

const Game = async () => {
	const currentArtistTracks = await fetchTopTracks('grizzlybear')
	const currentSongTitle = currentArtistTracks.tracks[0].name
	const currentSongUrl = currentArtistTracks.tracks[0].preview_url
    const currentSongReleaseDate = currentArtistTracks.tracks[0].album.release_date
	const currentSongImage = currentArtistTracks.tracks[0].album.images[0]
    const currentSongSpotifyLink = currentArtistTracks.tracks[0].external_urls.spotify

	const currentArtist = await fetchArtist('grizzlybear')
	const currentArtistName = currentArtist.artists.items[0].name

	return (
		<div className="main">
			<GameBoard
				currentSongTitle={currentSongTitle}
				currentArtistName={currentArtistName}
				currentSongImage={currentSongImage}
				currentSongReleaseDate={currentSongReleaseDate}
			></GameBoard>
			<MusicPlayer
				currentSongUrl={currentSongUrl}
				currentSongSpotifyLink={currentSongSpotifyLink}
			></MusicPlayer>
		</div>
	)
}

export default Game
