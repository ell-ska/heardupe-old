'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import NavLink from './NavLink'
import './css/header.css'

const Header = () => {
	const [homeClick, setHomeClick] = useState(0)
	const routerPath = usePathname()

	useEffect(() => {
		homeClick === 2 ? null : setHomeClick(0)
	}, [routerPath])

	const homeEasterEgg = homeClick >= 2 ? 'menu__item--easter-egg' : null
	const homeActive = routerPath === '/' ? 'menu__item--active' : null

    // DONE: active menu item
	// ADD: search page when implemented
	const menuItems = [
		{
			path: './playlists',
			name: 'Playlists',
		},
		{
			path: './profile',
			name: 'Profile',
		},
	]

	return (
		<header className="header">
			<div className="header__inner">
				<nav className="menu">
					<div className={`menu__item ${homeActive} ${homeEasterEgg}`}>
						<Link href="/" onClick={() => setHomeClick((prev) => prev + 1)}>
							Home
						</Link>
						<span>Home</span>
					</div>
					{menuItems.map((item) => {
						return (
							<NavLink
								key={item.path}
								{...item}
								active={routerPath.includes(item.name.toLowerCase())}
							></NavLink>
						)
					})}
				</nav>
			</div>
		</header>
	)
}

export default Header
