import fetchArtist from './fetchArtist'
import ArtistCard from './ArtistCard'
import './css/components/card.css'
import './css/home.css'

export default async function Home() {
	const staticArtist = await fetchArtist('grizzlybear')

	return (
		<div className="hero">
			<div className="hero__inner">
				<ArtistCard
					artist={staticArtist}
					featured={true}
					desc={true}
				></ArtistCard>
				<div className="hero__text">
					<span>Hello, and welcome to</span>
					<h1>Heardupe</h1>
					<h2>Please pick a playlist to start</h2>
				</div>
			</div>
		</div>
	)
}
