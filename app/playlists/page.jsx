import './playlists.css'
import '../css/components/card.css'

const Playlists = () => {
    return (
        <div className="playlists">
            <div className="playlists__inner">
                <div className="playlist__section">
                    <h2 className="playlist__title">Last Played</h2>
                    <div className="playlist__gallery">
                        <div className="card">
                            <h3 className="card__title">Remi Wolf</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlists