import { getServerSession } from 'next-auth'
import { LogoutButton } from './AuthButtons'
import { authOptions } from './api/auth/[...nextauth]/route'
import fetchArtist from './fetchArtist'
import ArtistCard from './ArtistCard'
import './css/components/card.css'
import './css/home.css'

const Home = async () => {
	const staticArtist = await fetchArtist('grizzlybear')

	const session = await getServerSession(authOptions)
	console.log(session)

	return (
		<div className="hero">
			<div className="hero__inner">
				<LogoutButton></LogoutButton>
				{/* <ArtistCard
					artist={staticArtist}
					featured={true}
					desc={true}
				></ArtistCard>
				<div className="hero__text">
					<span>Hello, and welcome to</span>
					<h1>Heardupe</h1>
					<h2>Please pick a playlist to start</h2>
				</div> */}
			</div>
		</div>
	)
}

export default Home