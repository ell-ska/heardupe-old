import fetchArtist from '../fetchArtist'
import ArtistCard from '../ArtistCard'
import './playlists.css'
import '../css/components/card.css'

const Playlists = async () => {
	const staticArtist = await fetchArtist('grizzlybear')

	return (
		<div className="playlists">
			<div className="playlists__inner">
				<div className="playlist__section">
					<h2 className="playlist__title">Last Played</h2>
					<div className="playlist__gallery">
						<ArtistCard artist={staticArtist}></ArtistCard>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Playlists
