// 'use client'
// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
import PlaylistCard from './PlaylistCard'
import './css/playlist-gallery.css'
import '../app/css/components/buttons.css'

const HomePlaylists = ({ playlists }) => {

    // TODO:
    // fix components:
    // this = playlistGallery
    // "playlistSection" good?
    // components folder...

    return (
        <div className="playlist-gallery">
            <div className="playlist-gallery__inner">
                <div className="playlist-gallery__gallery">
                    {playlists.map(playlist => {
                        return <PlaylistCard key={playlist.id} {...playlist} />
                    })}
                </div>
                {/* {playlistsToShow < 49 && (
                    <button
                        className='button button--small--outline'
                        onClick={() => setPlaylistsToShow(prev => prev < 45 ? prev + 9 : prev + 4)}
                    >Load more</button>
                )} */}
            </div>
        </div>
    )
}

export default HomePlaylists