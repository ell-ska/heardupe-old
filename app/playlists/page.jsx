import { getUserPlaylists, getTopArtists } from '@/utils/spotifyCalls'
import PlaylistSection from '../../components/PlaylistSection'
import './playlists.css'

const Playlists = async () => {
	let userPlaylists, topArtists //, lastPlayed, recommended
	const playlistsToShow = 12

    try {
        [ userPlaylists, topArtists ] = await Promise.all([
            getUserPlaylists(playlistsToShow),
            getTopArtists(playlistsToShow)
        ])
    } catch (error) {
        console.log(error.body)
    }

	return (
		<div className="playlists">
			<div className="playlists__inner">
				<PlaylistSection title="Top Artists" playlists={topArtists}/>
				<PlaylistSection title="My Playlists" playlists={userPlaylists}/>
			</div>
		</div>
	)
}

export default Playlists
