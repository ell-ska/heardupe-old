import Link from 'next/link'
import Image from 'next/image'
import playIcon from 'public/play-card.svg'
import './css/card.css'

const PlaylistCard = ({ featured, name, images, description }) => {
	return (
		<Link href="./game" className={featured ? 'card card--big' : 'card'}>
			<div className="card__image">
				<Image
					src={images[0].url}
					alt={name}
					width={images[0].width || 640}
					height={images[0].height || 640}
				></Image>
				<button>
					<Image src={playIcon} alt="Play"></Image>
				</button>
			</div>
			{featured && <span className="card__featured">Featured</span>}
			<h3 className="card__title">{name}</h3>
            {description && <p className="card__desc">{description}</p>}
		</Link>
	)
}

export default PlaylistCard
