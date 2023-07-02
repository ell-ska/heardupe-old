'use client'
import NavLink from './NavLink'
import './css/header.css'

const Header = () => {

	const menuItems = [
		{
			path: '/',
			name: 'Home'
		},
		{
			path: '/playlists',
			name: 'Playlists',
		},
		{
			path: './search',
			name: 'Search'
		},
		{
			path: './profile',
			name: 'Profile',
		},
	]

	return (
		<header className="header">
				<nav className="menu">
					{menuItems.map((item) => {
						return (
							<NavLink
								key={item.path}
								{...item}
							></NavLink>
						)
					})}
				</nav>
		</header>
	)
}

export default Header
