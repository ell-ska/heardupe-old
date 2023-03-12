import Image from 'next/image'
import Link from 'next/link'
import notFoundImage from '../public/404.svg'
import './css/variables.css'
import './css/base.css'
import './css/components/buttons.css'
import './css/not-found.css'

export default function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found__inner">
				<Image src={notFoundImage} alt=""></Image>
				<h2>It looks like you got lost in the music!</h2>
				<h3>No, I&apos;m serious. This page doesn&apos;t exist.</h3>
				<Link href="/">
					<button>Get yourself home</button>
				</Link>
			</div>
		</div>
	)
}
