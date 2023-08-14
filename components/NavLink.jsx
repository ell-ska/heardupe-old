'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavLink = ({ path, name }) => {
	const routerPath = usePathname()
	const isActive =
		routerPath.includes(name.toLowerCase()) ||
		(name === 'Home' && routerPath === '/')

	return (
		<div className={isActive ? 'menu__item menu__item--active' : 'menu__item'}>
			<Link href={path}>{name}</Link>
		</div>
	)
}

export default NavLink
