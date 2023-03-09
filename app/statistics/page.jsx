'use client'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { statsAtom } from '../game/gameAtoms'
import './statistics.css'
import '../css/components/card.css'

const Statistics = () => {

    const [stats] = useAtom(statsAtom)
    
    useEffect(() => {
        const stats = JSON.parse(localStorage.getItem('stats')) || stats
    }, [stats])

    return (
        <div className="statistics">
            <div className="statistics__inner">
                <div className="card card--stats">
                    <h2>Total score</h2>
                    <h3>{stats.totalScore}</h3>
                </div>
                <div className="card card--stats">
                    <h2>High Score</h2>
                    <h3>{stats.highScore}</h3>
                </div>
                {/* <div className="card card--stats">
                    <h2>Top Artist</h2>
                    <h3>Remi Wolf</h3>
                </div> */}
                <div className="card card--stats">
                    <h2>Games played</h2>
                    <h3>{stats.gamesPlayed}</h3>
                </div>
            </div>
        </div>
    )
}

export default Statistics