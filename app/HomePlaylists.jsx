'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'
import PlaylistCard from './PlaylistCard'
import './css/home-playlists.css'
import './css/components/buttons.css'

const HomePlaylists = () => {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistsToShow, setPlaylistsToShow] = useState(9)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            // max limit is 50
            spotifyApi.getUserPlaylists({limit: playlistsToShow})
                .then(data => {
                    setPlaylists(data.body.items)
                })
        }
    }, [session, spotifyApi, playlistsToShow])

    console.log(playlists)

    return (
        <div className="home-playlists">
            <div className="home-playlists__inner">
                <div className="home-playlists__gallery">
                    {playlists.map(playlist => {
                        return <PlaylistCard key={playlist.id} {...playlist} />
                    })}
                </div>
                {playlistsToShow < 49 && (
                    <button
                        className='button button--small--outline'
                        onClick={() => setPlaylistsToShow(prev => prev < 45 ? prev + 9 : prev + 4)}
                    >Load more</button>
                )}
            </div>
        </div>
    )
}

export default HomePlaylists