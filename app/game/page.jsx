import GameBoard from './GameBoard'
import MusicPlayer from './MusicPlayer'
import fetchArtist from '../fetchArtist'
import './game.css'
import '../css/components/buttons.css'
import '../css/components/input.css'

const getTopTracks = async (name) => {
    const artist = await fetchArtist(name)
    return await fetchArtist(`${artist.artists.items[0].id}/top-tracks`)
}

const Game = async () => {
    const currentArtistTracks = await getTopTracks('veronicamaggio')
    const currentSongTitle = currentArtistTracks.tracks[6].name
    const currentSongUrl = currentArtistTracks.tracks[6].preview_url
    const currentSongReleaseDate = currentArtistTracks.tracks[6].album.release_date
    const currentSongImage = currentArtistTracks.tracks[6].album.images[0]
    const currentSongSpotifyLink = currentArtistTracks.tracks[6].external_urls.spotify

    const currentArtist = await fetchArtist('veronicamaggio')
    const currentArtistName = currentArtist.artists.items[0].name

    return (
        <div className='main'>
            <GameBoard currentSongTitle={currentSongTitle} currentArtistName={currentArtistName} currentSongImage={currentSongImage} currentSongReleaseDate={currentSongReleaseDate}></GameBoard>
            <MusicPlayer currentSongUrl={currentSongUrl} currentSongSpotifyLink={currentSongSpotifyLink}></MusicPlayer>
        </div>
    )
}

export default Game