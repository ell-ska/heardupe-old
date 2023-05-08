import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import fetchArtist from './fetchArtist'
import HomePlaylists from './HomePlaylists'
import PlaylistCard from './PlaylistCard'
import './css/components/card.css'
import './css/home.css'
import staticImage from 'public/placeholder.jpg'

const Home = async () => {
	// const staticArtist = await fetchArtist('grizzlybear')
	const staticPlaylist = {
		id: '12345',
		description: 'Indie pop, indie r&b, modern alternative pop',
		name: 'Remi Wolf',
		images: [{
			height: 640,
			width: 640,
			url: staticImage
		}]
	}

	// const session = await getServerSession(authOptions)
	// console.log(session)

	return (
		<>
			<div className="hero">
				<div className="hero__inner">
					<PlaylistCard
						{...staticPlaylist}
						featured={true}
					></PlaylistCard>
					<div className="hero__text">
						<span>Hello, and welcome to</span>
						<h1>Heardupe</h1>
						<h2>Please pick a playlist to start</h2>
					</div>
				</div>
			</div>
			<HomePlaylists></HomePlaylists>
		</>
	)
}

export default Home