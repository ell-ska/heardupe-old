import Link from "next/link"
import Image from 'next/image'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const ArtistCard = ({ artist, featured, desc }) => {
  const genres = artist.artists.items[0].genres.slice(0, 3).join(', ')

    return (
      <Link href="./game" className={featured ? "card card--big" : "card"}>
        <div className="card__image">
          <Image
            // className='card__image'
            src={artist.artists.items[0].images[0].url}
            alt={artist.artists.items[0].name}
            width={artist.artists.items[0].images[0].width}
            height={artist.artists.items[0].images[0].height}
          ></Image>

        </div>
          {featured ? <span className="card__featured">Featured</span> : null}
          <h3 className="card__title">{artist.artists.items[0].name}</h3>
          {desc ? <p className="card__desc">{capitalizeFirstLetter(genres)}</p> : null}
      </Link>
    )
}

export default ArtistCard