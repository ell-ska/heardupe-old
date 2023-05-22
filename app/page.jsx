import { Climate_Crisis } from 'next/font/google'
import { getUserPlaylists } from '@/utils/spotifyCalls'
import PlaylistGallery from '../components/PlaylistGallery'
import PlaylistCard from '../components/PlaylistCard'
import './css/home.css'
import staticImage from 'public/placeholder.jpg'

const climateCrisis = Climate_Crisis({
	subsets: ['latin'],
	weight: '400'
})

const Home = async () => {

	const staticPlaylist = {
		id: '0NB5HROxc8dDBXpkIi1v3d',
		type: 'artist',
		description: 'Indie pop, indie r&b, modern alternative pop',
		name: 'Remi Wolf',
		images: [{
			height: 640,
			width: 640,
			url: staticImage
		}]
	}

	let playlists

    try {
        playlists = await getUserPlaylists(49)
    } catch (error) {
        console.log(error.body)
    }

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
						<h1 className={climateCrisis.className}>Heardupe</h1>
						<h2>Please pick a playlist to start</h2>
					</div>
				</div>
			</div>
			<PlaylistGallery playlists={playlists} />
		</>
	)
}

export default Home