import fetchArtist from './fetchArtist'
import ArtistCard from './ArtistCard'
import './css/components/card.css'
import './css/home.css'

export default async function Home() {
  const staticArtist = await fetchArtist('grizzlybear')

  return (
    <div className="gallery">
      <div className="gallery__inner">
        <div className="card card--welcome">
          <span>Hello, and welcome to</span>
          <h1>H3ard!e</h1>
          <h2>Please pick a playlist to start</h2>
        </div>
        <ArtistCard artist={staticArtist}></ArtistCard>
      </div>
    </div>
  )
}
