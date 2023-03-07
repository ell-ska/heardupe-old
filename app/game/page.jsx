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
    const currentArtist = await getTopTracks('ulrikmunter')
    const currentSongTitle = currentArtist.tracks[1].name
    const currentSongUrl = currentArtist.tracks[1].preview_url

    return (
        <div className='main'>
            <GameBoard currentSongTitle={currentSongTitle}></GameBoard>
            <MusicPlayer currentSongUrl={currentSongUrl}></MusicPlayer>
        </div>
    )
}

export default Game