'use client'
import { useState } from 'react'
import PlaylistCard from './PlaylistCard'
import './css/playlist-gallery.css'
import '../app/css/components/buttons.css'

const PlaylistGallery = ({ playlists }) => {

    const maxPlaylistsToShow = 49
    const [playlistsToShow, setPlaylistsToShow] = useState(13)

    return (
        <div className="playlist-gallery">
            <div className="playlist-gallery__gallery">
                {playlists && playlists.slice(0, playlistsToShow).map(playlist => {
                    return <PlaylistCard key={playlist.id} {...playlist} />
                })}
            </div>
            {playlists && playlistsToShow < maxPlaylistsToShow && (
                <button
                    className='button button--small--outline'
                    onClick={() => setPlaylistsToShow(prev => prev < maxPlaylistsToShow - 4 ? prev + 9 : prev + 4)}
                >Load more</button>
            )}
        </div>
    )
}

export default PlaylistGallery