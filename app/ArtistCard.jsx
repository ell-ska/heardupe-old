import Link from "next/link"
import Image from 'next/image'

const ArtistCard = ({ artist }) => {
    return (
        <Link href="./game">
          <div className="card">
            <Image
              className='card__image'
              src={artist.artists.items[0].images[0].url}
              alt=""
              width={artist.artists.items[0].images[0].width}
              height={artist.artists.items[0].images[0].height}
            ></Image>
            <h3 className="card__title">{artist.artists.items[0].name}</h3>
          </div>
        </Link>
    )
}

export default ArtistCard