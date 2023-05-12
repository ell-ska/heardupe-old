import PlaylistCard from './PlaylistCard'

const PlaylistSection = ({ title, playlists }) => {
    return (
        <div className="section">
            <h2 className="section__title">{title}</h2>
            <div className="section__gallery">
                {playlists.map(playlist => <PlaylistCard key={playlist.id} {...playlist}/>)}
            </div>
        </div>
    )
}

export default PlaylistSection