import './statistics.css'
import '../css/components/card.css'

const Statistics = () => {
    return (
        <div className="statistics">
            <div className="statistics__inner">
                <div className="card card--stats">
                    <h2>Total score</h2>
                    <h3>54 300</h3>
                </div>
                <div className="card card--stats">
                    <h2>High Score</h2>
                    <h3>7 800</h3>
                </div>
                <div className="card card--stats">
                    <h2>Top Artist</h2>
                    <h3>Remi Wolf</h3>
                </div>
                <div className="card card--stats">
                    <h2>Games played</h2>
                    <h3>14</h3>
                </div>
            </div>
        </div>
    )
}

export default Statistics