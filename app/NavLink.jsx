import Link from "next/link"

const NavLink = ({ path, name, active }) => {
    return (
        <div className={active ? 'menu__item menu__item--active' : 'menu__item'}>
            <Link href={path}>{name}</Link>
        </div>
    )
}

export default NavLink