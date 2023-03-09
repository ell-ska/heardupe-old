import GameBoard from './GameBoard'
import MusicPlayer from './MusicPlayer'
import fetchArtist from '../fetchArtist'
// import Image from 'next/image'
import './game.css'
import '../css/components/buttons.css'
import '../css/components/input.css'

const getTopTracks = async (name) => {
    const artist = await fetchArtist(name)
    return await fetchArtist(`${artist.artists.items[0].id}/top-tracks`)
}

const Game = async () => {
    const currentArtistTracks = await getTopTracks('ulrikmunter')
    const currentSongTitle = currentArtistTracks.tracks[1].name
    const currentSongUrl = currentArtistTracks.tracks[1].preview_url
    const currentSongReleaseDate = currentArtistTracks.tracks[1].album.release_date

    const currentArtist = await fetchArtist('ulrikmunter')
    const currentArtistName = currentArtist.artists.items[0].name
    const currentArtistImage = currentArtist.artists.items[0].images[1]


    return (
        <div className='main'>
            <GameBoard currentSongTitle={currentSongTitle} currentArtistName={currentArtistName} currentArtistImage={currentArtistImage} currentSongReleaseDate={currentSongReleaseDate}></GameBoard>
            <MusicPlayer currentSongUrl={currentSongUrl}></MusicPlayer>
        </div>
    )
}

export default Game