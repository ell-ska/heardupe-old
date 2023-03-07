import Image from 'next/image'
import fetchArtist from './fetchArtist'
import './css/components/card.css'
import './css/home.css'

export default async function Home() {
  const remi = await fetchArtist('remiwolf')

  return (
    <div className="gallery">
      <div className="gallery__inner">
        <div className="card card--welcome">
          <span>Hello, and welcome to</span>
          <h1>H3ard!e</h1>
          <h2>Please pick a playlist to start</h2>
        </div>
        <div className="card">
          <Image
            className='card__image'
            src={remi.artists.items[0].images[0].url}
            alt=""
            width={remi.artists.items[0].images[0].width}
            height={remi.artists.items[0].images[0].height}
          ></Image>
          <h3 className="card__title">{remi.artists.items[0].name}</h3>
        </div>
      </div>
    </div>
  )
}
