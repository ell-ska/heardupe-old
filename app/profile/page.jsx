'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useAtom } from 'jotai'
import { statsAtom } from '../game/gameAtoms'
import { LogoutButton } from '../AuthButtons'
import './profile.css'
import '../css/components/buttons.css'
import '../css/components/card.css'

const Profile = () => {
	const { data: session } = useSession()
	console.log(session)
	// const [stats] = useAtom(statsAtom)

	// useEffect(() => {
	// 	const stats = JSON.parse(localStorage.getItem('stats')) || stats
	// }, [stats])

	return (
		<div className="profile">
			<div className="profile__inner">
				<div className="account">
					<div className="account__image">
						<Image src={session?.user.image} alt='Profile picture' height={112} width={112}></Image>
					</div>
					<div className="account__buttons">
						<button className='button button--small--outline'>Delete account</button>
						<LogoutButton></LogoutButton>
					</div>
				</div>
				{/* <div className="statistics">
					<div className="card card--stats">
						<h2>Total score</h2>
						<h3>{stats.totalScore}</h3>
					</div>
					<div className="card card--stats">
						<h2>High Score</h2>
						<h3>{stats.highScore}</h3>
					</div>
					<div className="card card--stats">
						<h2>Top Artist</h2>
						<h3>Remi Wolf</h3>
					</div>
					<div className="card card--stats">
						<h2>Games played</h2>
						<h3>{stats.gamesPlayed}</h3>
					</div>
				</div> */}
			</div>
		</div>
	)
}

export default Profile