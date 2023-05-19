import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import spotifyApi from './spotify'

const authenticate = async () => {
    const session = await getServerSession(authOptions)
    
    if (!session.user.accessToken) {
        signIn()
    }

    spotifyApi.setAccessToken(session.user.accessToken)
}

const getUserPlaylists = async (limit) => {
    await authenticate()

    const data = await spotifyApi.getUserPlaylists({ limit })
    return data.body.items
}

const getPlaylist = async (id) => {
    await authenticate()

    const data = await spotifyApi.getPlaylist(id)
    return data.body
}

const getPlaylistTracks = async (id) => {
    await authenticate()

    const data = await spotifyApi.getPlaylistTracks(id)
    return data.body.items
}

const getTopArtists = async (limit) => {
    await authenticate()

    const data = await spotifyApi.getMyTopArtists({ limit })
    return data.body.items
}

const getArtistTopTracks = async (id) => {
    await authenticate()

    const user = await spotifyApi.getMe()
    const data = await spotifyApi.getArtistTopTracks(id, user.body.country)
    return data.body.tracks
}

export { getUserPlaylists, getPlaylist, getPlaylistTracks, getTopArtists, getArtistTopTracks }