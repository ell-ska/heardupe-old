"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import './css/header.css'

const Header = () => {

    const [homeClick, setHomeClick] = useState(0)
    const routerPath = usePathname()

    useEffect(() => {
        homeClick === 2 ? null : setHomeClick(0)
    }, [routerPath])

    return (
        <header className="header">
            <div className="header__inner">
                <nav className="menu">
                    <div className={homeClick >= 2 ? 'menu__item menu__item--easter-egg' : 'menu__item'}>
                        <Link href="/" onClick={() => setHomeClick(prev => prev + 1)}>Home</Link>
                        <span>Home</span>
                    </div>
                    <div className="menu__item">
                        <Link href="./playlists">Playlists</Link>
                    </div>
                    <div className="menu__item">
                        <Link href="./search">Search</Link>
                    </div>
                    <div className="menu__item">
                        <Link href="./statistics">Statistics</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header